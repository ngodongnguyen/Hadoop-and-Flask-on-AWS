from datetime import datetime
from app import db

# Mô hình UploadedFile
class UploadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    file_size = db.Column(db.Integer, nullable=False)  # Kích thước file
    upload_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Thời gian tải lên

    # Thêm trường user_id để liên kết với bảng User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<UploadedFile {self.filename}>'
    def __init__(self, filename, file_size, upload_time, user_id):
        self.filename = filename
        self.file_size = file_size
        self.upload_time = upload_time
        self.user_id = user_id

    # Phương thức save để lưu đối tượng vào cơ sở dữ liệu
    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_all_files(cls):
        return cls.query.all()
