from flask import Flask, request, jsonify, render_template, redirect, url_for,flash
import stripe
from hdfs import InsecureClient
import os
import logging
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from model import User
from app import app,db,hdfs_client


# Khởi tạo thư mục tải lên (Local)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# 📌 API: Đăng ký người dùng

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            email = request.form['email']
            password = request.form['password']
            confirm_password = request.form['confirm_password']

            if not email or not password or not confirm_password:
                flash("Thiếu email, password hoặc xác nhận mật khẩu", "error")
                return redirect(url_for('register'))

            # Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
            if password != confirm_password:
                flash("Mật khẩu và xác nhận mật khẩu không khớp.", "error")
                return redirect(url_for('register'))

            # Kiểm tra nếu người dùng đã tồn tại
            if User.query.filter_by(email=email).first():
                flash("Email đã được đăng ký.", "error")
                return redirect(url_for('register'))

            # Mã hóa mật khẩu
            password_hash = generate_password_hash(password)

            # Thêm người dùng vào cơ sở dữ liệu
            new_user = User(email=email, password_hash=password_hash)
            db.session.add(new_user)
            db.session.commit()

            flash(f"User {email} registered successfully!", "success")
            return redirect(url_for('login'))  # Redirect to login page

        except Exception as e:
            flash(f"Lỗi server: {e}", "error")
            return redirect(url_for('register'))

    return render_template('register.html')


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

            # Đăng nhập thành công
            return redirect(url_for('home'))  # Đưa người dùng về trang chủ sau khi đăng nhập thành công

        except Exception as e:
            logging.error(f"❌ Lỗi trong /login: {e}")
            return jsonify({"error": "Lỗi server"}), 500

    # Nếu là GET request, trả về trang login
    return render_template('login.html')

# 📌 API: Upload file lên HDFS
@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        file = request.files.get('file')

        if not file:
            logging.error("❌ Không có file nào được tải lên.")
            return jsonify({"error": "Không có file nào được tải lên"}), 400

        # Lưu file vào thư mục local
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        logging.info(f"📂 File {file.filename} đã lưu vào local: {file_path}")

        # Tải lên HDFS
        remote_path = f'/user/hadoop/{file.filename}'
        try:
            with open(file_path, 'rb') as local_file:
                with hdfs_client.write(remote_path, overwrite=True) as hdfs_file:
                    hdfs_file.write(local_file.read())

            logging.info(f"✅ File {file.filename} đã tải lên HDFS thành công: {remote_path}")
            return jsonify({"message": "File uploaded to HDFS successfully!", "hdfs_path": remote_path}), 200
        except Exception as e:
            logging.error(f"❌ Lỗi khi lưu file vào HDFS: {e}")
            return jsonify({"error": f"Lỗi khi lưu file vào HDFS: {str(e)}"}), 500

    except Exception as e:
        logging.error(f"❌ Lỗi trong /upload: {e}")
        return jsonify({"error": f"Lỗi server: {str(e)}"}), 500
# 📌 API: Xem danh sách các tệp đã tải lên HDFS
@app.route('/list_files', methods=['GET'])
def list_files():
    try:
        file_list = hdfs_client.list('/user/hadoop/')
        return jsonify({"files": file_list}), 200
    except Exception as e:
        logging.error(f"❌ Lỗi khi lấy danh sách tệp: {e}")
        return jsonify({"error": "Lỗi server khi lấy danh sách tệp."}), 500
    # 📌 API: Thanh toán qua Stripe
@app.route('/pay', methods=['POST'])
def pay():
    try:
        data = request.get_json()
        amount = data.get('amount')  # Số tiền cần thanh toán

        if not amount:
            return jsonify({"error": "Thiếu số tiền thanh toán"}), 400

        # Tạo một phiên thanh toán Stripe
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Sample Payment',
                    },
                    'unit_amount': amount * 100,  # Stripe yêu cầu số tiền tính bằng cent
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=request.host_url + 'payment_success',
            cancel_url=request.host_url + 'payment_cancel',
        )

        return jsonify({"session_url": session.url}), 200
    except Exception as e:
        logging.error(f"❌ Lỗi trong /pay: {e}")
        return jsonify({"error": "Lỗi thanh toán"}), 500


@app.route('/payment_success')
def payment_success():
    return "Thanh toán thành công! Cảm ơn bạn."

@app.route('/payment_cancel')
def payment_cancel():
    return "Thanh toán bị hủy. Vui lòng thử lại."

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
    return render_template('index.html')

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