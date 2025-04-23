from flask import Flask, request, jsonify, render_template, redirect, url_for,flash,session,send_from_directory
import stripe
from flask import send_file, abort
import io
from hdfs import InsecureClient
import requests
import os
# import logging
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from model.user import User
from model.UploadedFile import UploadedFile
from app import app,db,mail
from datetime import datetime
import qrcode
import urllib.parse
from flask_mail import Mail, Message

# HDFS_URL = "http://10.0.1.165:9870"  # Địa chỉ HDFS của bạn
HDFS_URL="http://localhost:50070"
client = InsecureClient(HDFS_URL, user="hadoop")  # Kết nối với HDFS
stripe.api_key = "sk_test_51QupLVECybCxgSlYH1bkz4hOTGr4XOuWMxurrAyRJOJ5Zp1nz5uJt6p6ZFGHYv5HqoBqN64fkzmDr7HuHNtlc5VI00va8yTRqa"



# 📌 API: Đăng ký người dùng

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            email = request.form['email']
            password = request.form['password']
            confirm_password = request.form['confirm_password']
            user_type = int(request.form['user_type'])  # Lấy lựa chọn phân loại và chuyển về kiểu int
            if not email or not password or not confirm_password:
                flash("Thiếu email, password hoặc xác nhận mật khẩu", "error")
                return redirect(url_for('register'))

            if password != confirm_password:
                flash("Mật khẩu và xác nhận mật khẩu không khớp.", "error")
                return redirect(url_for('register'))

            if User.query.filter_by(email=email).first():
                flash("Email đã được đăng ký.", "error")
                return redirect(url_for('register'))

            password_hash = generate_password_hash(password)
            if user_type == 1:
                upload_limit = 1  # 1GB
            elif user_type == 2:
                upload_limit = 2 # 2GB
            elif user_type == 3:
                upload_limit = 3 # 3GB
            else:
                upload_limit = 0  # Nếu user_type không hợp lệ

            # Thêm người dùng vào cơ sở dữ liệu
            new_user = User(email=email, password_hash=password_hash, user_type=user_type,upload_limit=upload_limit)
            db.session.add(new_user)
            db.session.commit()
            user_type = request.form['user_type'] # Lấy lựa chọn phân loại và chuyển về kiểu int

            # Nếu người dùng chọn Option 2 (2GB) hoặc Option 3 (3GB), chuyển sang trang thanh toán
            if user_type == '2':
                return redirect(url_for('payment', plan='2'))  # Option 2 - 10$/month
            elif user_type == '3':
                return redirect(url_for('payment', plan='3'))  # Option 3 - 18$/month

            flash(f"User {email} registered successfully!", "success")
            return redirect(url_for('login'))

        except Exception as e:
            flash(f"Lỗi server: {e}", "error")
            return redirect(url_for('register'))

    return render_template('register.html')
@app.route('/payment/<plan>', methods=['GET', 'POST'])
def payment(plan):
    plan_from_form = request.form.get('plan')
    if request.method == 'POST':
        plan_from_form = request.form.get('plan')

    if plan == '2':
        price_usd = 10  
        memo = "Thanh toan 2GB"
    elif plan == '3':
        price_usd = 18  
        memo = "Thanh toan goi 3GB"
    elif plan == '4':
        price_usd = 4  
        upload_limit = 4  # 0.5GB
        memo = "Thanh toan goi 4GB"
    elif plan == '5':
        price_usd = 5  
        upload_limit = 5  # 0.5GB
        memo = "Thanh toan goi 5GB"
    elif plan == '1':
        price_usd = 5  # 5$ cho Option 1 (1GB)
        memo = "Thanh toan goi 1GB"
    else:
        flash("Invalid plan selected", "error")
        return redirect(url_for('home'))

    price_vnd = 25000 * price_usd

    user_id = session.get('user_id')  

    if user_id:
        try:
            upload_limit=upload_limit/2
            user = User.query.get(user_id)
            user.upload_limit =user.upload_limit+ upload_limit   
            db.session.commit()  
        except Exception as e:
            flash(f"Error updating upload limit: {e}", "error")

    try:
        response = requests.post(
            "http://localhost:3001/generate_qr",
            json={"amount": price_vnd, "memo": memo}
        )
        result = response.json()
        qr_code_url = f"qr_codes/{result['filename']}"
    except Exception as e:
        flash(f"Không thể tạo mã QR: {e}", "error")
        qr_code_url = None

    return render_template(
        'payment.html',
        plan=plan,
        price=price_usd,
        price_vnd=price_vnd,
        memo=memo,
        qr_code_url=qr_code_url
    )


@app.route('/process_payment', methods=['POST'])
def process_payment():
    price = request.form['price']
    plan = request.form['plan']

    try:
        # Xử lý thanh toán tại đây (ví dụ, Stripe hoặc thanh toán trực tiếp qua VietQR)
        flash("Payment successful!", "success")
        return redirect(url_for('home'))  # Quay lại trang chính sau khi thanh toán thành công

    except Exception as e:
        flash(f"Payment failed: {str(e)}", "error")
        return redirect(url_for('payment', plan=plan))  # Nếu có lỗi, quay lại trang thanh toán

# 📌 API: Đăng nhập người dùng
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Xử lý đăng nhập khi người dùng gửi form
        try:
            data = request.form  # Lấy dữ liệu từ form
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return jsonify({"error": "Thiếu email hoặc password"}), 400

            # Kiểm tra người dùng trong cơ sở dữ liệu
            user = User.query.filter_by(email=email).first()
            if not user or not check_password_hash(user.password_hash, password):
                return jsonify({"error": "Email hoặc mật khẩu không đúng."}), 400
            session['user_id'] = user.id
            session['email'] = user.email  # Lưu email người dùng vào session
            session['username'] = user.email.split('@')[0]  # Lưu tên người dùng (có thể là email trước dấu '@')
            session['upload_limit']=user.upload_limit
            # Đăng nhập thành công
            return redirect(url_for('home'))  # Đưa người dùng về trang chủ sau khi đăng nhập thành công

        except Exception as e:
            return jsonify({"error": "Lỗi server"}), 500

    # Nếu là GET request, trả về trang login
    return render_template('login.html')

import os

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    total_size = 0
    upload_limit = 0  # Đảm bảo upload_limit có giá trị hợp lệ

    if request.method == 'POST':
        # Kiểm tra file ngay từ đầu
        if 'file' not in request.files:
            flash('No file selected', 'error')
            return redirect(url_for('upload_file'))
            
        file = request.files['file']
        
        # Kiểm tra nếu file không có hoặc không có tên
        if file.filename == '':
            flash('No selected file', 'error')
            return redirect(url_for('upload_file'))

        # Lấy thông tin người dùng
        user_id = session.get('user_id')
        if not user_id:
            flash("You must be logged in to upload a file.", "error")
            return redirect(url_for('login'))

        user_email = session.get('email')
        user = User.query.get(user_id)
        if not user:
            flash("User not found", "error")
            return redirect(url_for('upload_file'))

        # Kiểm tra file trước khi tiến hành lưu
        print(f"Filename: {file.filename}")

        # Đảm bảo thư mục temp tồn tại
        temp_folder = 'temp'
        if not os.path.exists(temp_folder):
            os.makedirs(temp_folder)  # Tạo thư mục temp nếu chưa tồn tại

        # Lưu tạm thời file vào hệ thống
        file_path = os.path.join(temp_folder, file.filename)
        try:
            # Lưu file tạm thời vào thư mục temp
            file.save(file_path)
            
            # Lấy kích thước file sau khi lưu
            file_size = os.path.getsize(file_path)
            print(f"File size: {file_size} bytes")
        except Exception as e:
            flash(f"Error saving file: {str(e)}", "error")
            # Xóa file tạm thời nếu lưu không thành công
            if os.path.exists(file_path):
                os.remove(file_path)
            return redirect(url_for('upload_file'))

        upload_limit = float(session.get('upload_limit', 0)) * 1024 * 1024 * 1024
        
        # Lấy danh sách file và tính tổng dung lượng HIỆN CÓ
        files = get_user_files(user_email)
        current_total_size = sum(file['size'] for file in files)

        # KIỂM TRA DUNG LƯỢNG TRƯỚC KHI UPLOAD
        if (current_total_size + file_size) > upload_limit:
            flash(f"Error: Exceeded storage limit. You can only upload {upload_limit // (1024*1024*1024)}GB total.", "error")
            # Xóa file tạm thời nếu vượt quá giới hạn
            if os.path.exists(file_path):
                os.remove(file_path)
            return redirect(url_for('upload_file'))

        # Kiểm tra dung lượng còn lại dưới 100MB (sau khi đã kiểm tra vượt giới hạn)
        remaining_size = upload_limit - (current_total_size + file_size)
        print(f"Remaining size: {remaining_size} bytes")
        if remaining_size < 100 * 1024 * 1024:
            try:
                msg = Message("Warning: Low Storage", recipients=[user.email])
                msg.body = f"Dear {user.email},\n\nYour storage is almost full. You have less than 100MB remaining. Please upgrade your storage plan."
                mail.send(msg)
            except Exception as e:
                print(f"Email warning failed: {str(e)}")

        # Tiến hành upload file lên HDFS
        user_folder = f"/user/hadoop/{user_email}"
        hdfs_path = f"{user_folder}/{file.filename}"

        try:
            client.makedirs(user_folder)
            with client.write(hdfs_path, overwrite=True) as writer:
                with open(file_path, 'rb') as f:  # Mở file đã lưu để ghi vào HDFS
                    writer.write(f.read())

            file_info = client.status(hdfs_path)
            uploaded_file_size = file_info['length']

            uploaded_file = UploadedFile(
                filename=file.filename, 
                file_size=uploaded_file_size, 
                upload_time=datetime.now(), 
                user_id=user_id
            )
            uploaded_file.save()

            flash(f"File {file.filename} uploaded successfully! Size: {uploaded_file_size} bytes", "success")
        except Exception as e:
            flash(f"Upload failed: {str(e)}", "error")
        
        # Xóa file tạm thời sau khi upload thành công
        if os.path.exists(file_path):
            os.remove(file_path)

        return redirect(url_for('upload_file'))

    # Xử lý GET request
    user_email = session.get('email')
    files = get_user_files(user_email) if user_email else []
    total_size = sum(file['size'] for file in files)
    upload_limit = float(session.get('upload_limit', 0)) * 1024 * 1024 * 1024
    
    return render_template('upload.html', 
        total_size=total_size, 
        upload_limit=upload_limit, 
        convert_bytes=convert_bytes
    )


from datetime import datetime

def get_user_files(user_email):
    # Đường dẫn tới thư mục của người dùng
    user_folder = f"/user/hadoop/{user_email}"  # Đường dẫn tới thư mục người dùng
    try:
        # Lấy danh sách các tệp trong thư mục người dùng
        files = client.list(user_folder)
        
        # Get file details (size and upload time)
        detailed_files = []
        for file in files:
            file_path = f"{user_folder}/{file}"
            file_size = client.status(file_path)['length']  # Get file size
             # Lấy thời gian sửa đổi (modification time) từ HDFS
            modification_time = client.status(file_path)['modificationTime']  # Thời gian sửa đổi (timestamp)
            # Chuyển timestamp thành định dạng ngày giờ
            upload_time = datetime.fromtimestamp(modification_time / 1000).strftime('%Y-%m-%d %H:%M:%S')  # Chuyển từ milliseconds sang giây
            detailed_files.append({
                'name': file,
                'size': file_size,
                'upload_time': upload_time
            })
        return detailed_files
    except Exception as e:
        print(f"Error fetching files for {user_email}: {e}")
        return []

@app.route('/security_storage')
def security_storage():
    if not session.get('user_id'):
        return redirect(url_for('login'))  # Kiểm tra xem người dùng đã đăng nhập chưa

    user_email = session.get('email')  # Lấy email của người dùng từ session
    files = get_user_files(user_email)  # Lấy danh sách các tệp từ Hadoop
    # Tính tổng dung lượng đã sử dụng
    total_size = sum(file['size'] for file in files)
    user_id = session.get('user_id')  # Lấy user_id từ session để truy xuất người dùng trong cơ sở dữ liệu
    user = User.query.get(user_id)  # Lấy thông tin người dùng từ cơ sở dữ liệu theo user_id
    upload_limit = user.upload_limit  # Lấy upload_limit từ cơ sở dữ liệu
    max_size = float(upload_limit) * 1024 * 1024 * 1024  # Chuyển đổi GB sang bytes

    return render_template('security_storage.html', files=files, convert_bytes=convert_bytes, total_size=total_size, max_size=max_size)



@app.route('/download_file/<filename>')
def download_file(filename):
    user_email = session.get('email')  # Lấy email người dùng từ session
    user_folder = f"/user/hadoop/{user_email}"  # Thư mục người dùng trong HDFS

    try:
        # Tạo đường dẫn đến file trong HDFS
        file_path = f"{user_folder}/{filename}"

        # Kiểm tra xem file có tồn tại trong HDFS không
        if client.status(file_path, strict=False):  # strict=False sẽ không raise lỗi nếu file không tồn tại
            # Đọc file từ HDFS dưới dạng nhị phân
            with client.read(file_path, encoding=None) as reader:  # Không giải mã dữ liệu, trả về byte stream
                # Chuyển dữ liệu thành một đối tượng BytesIO để Flask có thể gửi nó
                file_data = io.BytesIO(reader.read())  # Chuyển dữ liệu thành đối tượng BytesIO

                # Trả về file dưới dạng download
                file_data.seek(0)  # Đảm bảo vị trí đọc bắt đầu từ đầu file
                return send_file(file_data, download_name=filename, as_attachment=True)
        else:
            return f"File {filename} not found", 404  # Nếu file không tồn tại, trả lỗi 404
    except Exception as e:
        print(f"Error downloading file {filename}: {e}")
        return f"Error downloading file {filename}", 500  # Trả lỗi nếu có vấn đề


def convert_bytes(size_in_bytes):
    if size_in_bytes >= 1024 * 1024 * 1024:  # Kiểm tra GB
        size_in_gb = size_in_bytes / (1024 * 1024 * 1024)
        return f"{size_in_gb:.2f} GB"
    elif size_in_bytes >= 1024 * 1024:  # Kiểm tra MB
        size_in_mb = size_in_bytes / (1024 * 1024)
        return f"{size_in_mb:.2f} MB"
    elif size_in_bytes >= 1024:  # Kiểm tra KB
        size_in_kb = size_in_bytes / 1024
        return f"{size_in_kb:.2f} KB"
    else:  # Kiểm tra Byte
        return f"{size_in_bytes} bytes"


    
@app.route('/delete_file/<filename>', methods=['POST'])
def delete_file(filename):
    print(f"Method for deleting file {filename}: {request.method}")  # In ra phương thức request
    if request.method != 'POST':
        flash(f"Method {request.method} not allowed.", "error")
        return redirect(url_for('security_storage'))  # Quay lại trang nếu phương thức không hợp lệ

    user_email = session.get('email')
    user_folder = f"/user/hadoop/{user_email}"

    try:
        # Xoá tệp từ HDFS
        client.delete(f"{user_folder}/{filename}")
        flash(f"File {filename} deleted successfully!", "success")
        return redirect(url_for('security_storage'))  # Quay lại trang sau khi xoá tệp
    except Exception as e:
        flash(f"Error deleting file {filename}: {e}", "error")
        return redirect(url_for('security_storage'))  # Quay lại trang nếu có lỗi


@app.route('/')
def home():
    with app.app_context():
        db.create_all()
    # Kiểm tra xem người dùng admin đã tồn tại chưa
    admin_user = User.query.filter_by(email='admin@example.com').first()

    if not admin_user:
        # Nếu không tồn tại, tạo tài khoản admin mới
        admin_user = User(email='admin@example.com')
        admin_user.set_password('123')  # Mã hóa mật khẩu '123'

        db.session.add(admin_user)
        db.session.commit()

        print("Admin account created successfully!")
    else:
        print("Admin account already exists.")
    if 'user_id' in session:
        username = session.get('username')  # Lấy tên người dùng từ session
    else:
        username = None  # Nếu chưa đăng nhập, không có tên người dùng
    return render_template('index.html')
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('email', None)
    session.pop('username', None)
    flash("You have been logged out.", "info")
    return redirect(url_for('login'))


@app.route('/data', methods=['GET', 'POST'])
def data():
    if not session.get('user_id'):
        return redirect(url_for('login'))  # Nếu chưa đăng nhập, chuyển đến trang đăng nhập

    user_id = session.get('user_id')
    user = User.query.get(user_id)  # Lấy thông tin người dùng từ database
    

    return render_template('data.html', user=user, convert_bytes=convert_bytes)


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/service')
def service():
    return render_template('service.html')

@app.route('/why')
def why():
    return render_template('why.html')

@app.route('/team')
def team():
    return render_template('team.html')

if __name__ == '__main__':
    app.run(debug=True)  # Cho phép truy cập từ bên ngoài