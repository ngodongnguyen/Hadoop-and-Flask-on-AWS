from flask import Flask, request, jsonify, render_template, redirect, url_for
import stripe
from hdfs import InsecureClient
import os
import logging
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
# Cấu hình logging để debug lỗi
logging.basicConfig(level=logging.DEBUG)

# Cấu hình Stripe
stripe.api_key = "sk_test_51QupLVECybCxgSlYH1bkz4hOTGr4XOuWMxurrAyRJOJ5Zp1nz5uJt6p6ZFGHYv5HqoBqN64fkzmDr7HuHNtlc5VI00va8yTRqa"

# Kết nối với HDFS
HDFS_URL = 'http://localhost:50070'
HDFS_USER = 'hadoop'
try:
    hdfs_client = InsecureClient(HDFS_URL, user=HDFS_USER)
    logging.info("✅ Kết nối HDFS thành công.")
except Exception as e:
    logging.error(f"❌ Lỗi kết nối HDFS: {e}")
app = Flask(__name__, static_url_path='/static')
# Cấu hình cơ sở dữ liệu SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Ngodongnguyen2004?@localhost/Hadoop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)