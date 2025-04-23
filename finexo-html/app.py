from flask import Flask, request, jsonify, render_template, redirect, url_for
import stripe
from hdfs import InsecureClient
# import os
# import logging
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

# Cấu hình logging để debug lỗi
# logging.basicConfig(level=logging.DEBUG)

# Cấu hình Stripe

# Kết nối với HDFS
# HDFS_URL = 'http://localhost:50070'
# HDFS_USER = 'hadoop'
# try:
#     hdfs_client = InsecureClient(HDFS_URL, user=HDFS_USER)
#     logging.info("✅ Kết nối HDFS thành công.")
# except Exception as e:
#     logging.error(f"❌ Lỗi kết nối HDFS: {e}")
app = Flask(__name__, static_url_path='/static')
# Cấu hình cơ sở dữ liệu SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:123456789@10.0.3.184:3306/hadoop'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Ngodongnguyen2004?@localhost/hadoop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Tắt cảnh báo không cần thiết
app.config['SECRET_KEY'] = '99f02be7f14ff71e9d359a18417f34e794cb5e737e71b'
db = SQLAlchemy(app)
# Cấu hình Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Ví dụ sử dụng Gmail
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'ngodongnguyen27@gmail.com'  # Thay bằng email của bạn
app.config['MAIL_PASSWORD'] = 'mbtt ksdj wlhn fupd'  # Thay bằng mật khẩu email của bạn
app.config['MAIL_DEFAULT_SENDER'] = 'ngodongnguyen27@gmail.com'
mail = Mail(app)


