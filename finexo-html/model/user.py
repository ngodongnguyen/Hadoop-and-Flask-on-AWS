from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    user_type = db.Column(db.Integer, nullable=False, default=1)  # Thêm trường phân loại user (1, 2, hoặc 3)
    upload_limit = db.Column(db.Float, nullable=False,default=1)  # Dung lượng tối đa người dùng có thể tải lên

    # Quan hệ một-nhiều với bảng UploadedFile
    uploaded_files = db.relationship('UploadedFile', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_upload_limit(self):
        """ Trả về dung lượng tối đa của người dùng theo loại người dùng """
        return self.upload_limit

    def update_upload_limit(self, additional_limit):
        """ Cập nhật thêm dung lượng cho người dùng """
        self.upload_limit += additional_limit
        db.session.commit()

    def set_upload_limit(self):
        """ Cập nhật upload_limit dựa trên user_type """
        if self.user_type == 1:
            self.upload_limit = 1 * 1024 * 1024 * 1024  # 1GB
        elif self.user_type == 2:
            self.upload_limit = 2 * 1024 * 1024 * 1024  # 2GB
        elif self.user_type == 3:
            self.upload_limit = 3 * 1024 * 1024 * 1024  # 3GB

