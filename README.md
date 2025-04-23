# **Hướng dẫn triển khai hệ thống Hadoop với EC2 và Web Server trên AWS**

## **Giới thiệu**

Dự án này triển khai hệ thống Hadoop đa nút trên AWS, bao gồm các thành phần như:

- VPC và Subnet cấu hình cho hệ thống mạng.
- EC2 Instances cho các Master Node, Slave Node và Web Server.
- Cài đặt và cấu hình Apache, WSGI, MySQL, SSL.
- Triển khai Load Balancer để giảm tải cho Web Server.

## **Các bước triển khai**

### **Bước 1: Tạo VPC trên AWS Console**
1. Vào **VPC** trên AWS Console.
2. Chọn **Create VPC**.
3. Điền thông tin:
   - **Name tag**: `Hadoop`
   - **IPv4 CIDR block**: `10.0.0.0/16`
4. Chọn **Create VPC**.

### **Bước 2: Tạo Subnet**
Tạo 4 Subnet:
1. **Hadoop (Private)**:
   - Subnet name: `Hadoop-subnet`
   - Availability Zone: `us-east-1a`
   - IPv4 CIDR block: `10.0.1.0/24`
   
2. **Web (Private)**:
   - Subnet name: `Web-subnet`
   - Availability Zone: `us-east-1b`
   - IPv4 CIDR block: `10.0.2.0/24`
   
3. **Database (Private)**:
   - Subnet name: `Database-subnet`
   - Availability Zone: `us-east-1c`
   - IPv4 CIDR block: `10.0.3.0/24`
   
4. **Load Balancer (Public)**:
   - Subnet name: `LoadBalancer-subnet`
   - Availability Zone: `us-east-1d`
   - IPv4 CIDR block: `10.0.4.0/24`

### **Bước 3: Tạo Router Public**
1. Vào **Route Tables** và chọn **Create Route Table**.
2. Điền thông tin:
   - **Name**: `Public-router`
   - **VPC**: `Hadoop`
3. Sau khi tạo, gán tất cả các subnet vào **Public-router**.

### **Bước 4: Tạo Internet Gateway**
1. Vào **Internet Gateways** và chọn **Create**.
2. Điền tên: `Hg-ig`.
3. Gắn **Internet Gateway** vào **VPC** `Hadoop`.
4. Trong **Route Tables**, chỉnh sửa và thêm một rule mới với địa chỉ `0.0.0.0/0` và chọn **Internet Gateway** `Hg-ig`.

### **Bước 5: Cài đặt Hadoop trên 4 EC2 Instances**
1. Cài đặt Hadoop với 1 Master Node và 3 Slave Nodes theo hướng dẫn từ [Hướng dẫn xây dựng cụm Hadoop](https://www.mssqltips.com/sqlservertip/7877/build-multi-node-apache-hadoop-cluster-aws-ec2/).
2. Tạo một Database kết nối với Web Server EC2.
3. Cài đặt MySQL:
   - Trên EC2 Database:
     ```bash
     sudo apt update
     sudo apt install pkg-config libmysqlclient-dev mysql-client-core-8.0 mysql-server
     ```
   - Truy cập vào MySQL:
     ```bash
     mysql -h <RDS-endpoint> -u admin -p
     ```

### **Bước 6: Cài đặt Web Server trên EC2**
1. Cài đặt Apache2 và các thư viện cần thiết:
   ```bash
   sudo apt update
   sudo apt-get -y upgrade
   sudo apt install apache2 libapache2-mod-wsgi-py3
   sudo a2enmod wsgi
   sudo a2enmod ssl
   sudo systemctl restart apache2
   ```

2. Cài đặt SSL:
   ```bash
   sudo openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/ssl/private/apache.key -out /etc/ssl/certs/apache.crt
   ```

3. Tạo thư mục cho ứng dụng Flask:
   ```bash
   sudo mkdir /var/www/flaskapp
   sudo chown -R ubuntu:ubuntu /var/www/flaskapp
   sudo chmod -R 755 /var/www/flaskapp/templates
   sudo mkdir -p /var/www/flaskapp/temp
   sudo chown -R www-data:www-data /var/www/flaskapp/temp
   ```

4. Cài đặt virtual environment và các thư viện yêu cầu:
   ```bash
   cd /var/www/flaskapp
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install flask_mail qrcode pymysql
   ```

### **Bước 7: Cấu hình WSGI**
1. Tạo tệp **`flaskapp.wsgi`**:
   ```bash
   sudo nano /var/www/flaskapp/flaskapp.wsgi
   ```
   Nội dung tệp:
   ```python
   import sys
   import logging
   logging.basicConfig(stream=sys.stderr)
   sys.path.insert(0, '/var/www/flaskapp/venv/lib/python3.12/site-packages')  # Đảm bảo đường dẫn đúng
   sys.path.insert(0, '/var/www/flaskapp')
   from index import app as application  # Hoặc từ app import app as application
   ```

2. Tạo tệp **`flaskapp.conf`** cho Apache2:
   ```bash
   sudo nano /etc/apache2/sites-available/flaskapp.conf
   ```
   Nội dung tệp:
   ```apache
   <VirtualHost *:80>
       ServerName 34.201.175.137
       DocumentRoot /var/www/flaskapp

       WSGIProcessGroup flaskapp
       WSGIScriptAlias / /var/www/flaskapp/flaskapp.wsgi

       <Directory /var/www/flaskapp>
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

### **Bước 8: Cấu hình SSL**
1. Tạo tệp **`flaskapp-ssl.conf`**:
   ```bash
   sudo nano /etc/apache2/sites-available/flaskapp-ssl.conf
   ```
   Nội dung tệp:
   ```apache
   <VirtualHost *:443>
       ServerName 34.201.175.137
       DocumentRoot /var/www/flaskapp

       SSLEngine on
       SSLCertificateFile /etc/ssl/certs/apache.crt
       SSLCertificateKeyFile /etc/ssl/private/apache.key

       WSGIDaemonProcess flaskapp python-path=/var/www/flaskapp:/var/www/flaskapp/venv/lib/python3.8/site-packages
       WSGIProcessGroup flaskapp
       WSGIScriptAlias / /var/www/flaskapp/flaskapp.wsgi

       <Directory /var/www/flaskapp>
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

2. Kích hoạt cấu hình SSL:
   ```bash
   sudo a2ensite flaskapp-ssl.conf
   sudo a2enmod ssl
   sudo systemctl restart apache2
   ```

### **Bước 9: Tạo Load Balancer**
1. **Tạo Image của Web Server**.
2. **Tạo Instance Web Server 2** và gán Image của Web Server 1 vào.
3. **Tạo Target Group** và **Load Balancer**.
4. Gán Target Group vào Load Balancer và cấu hình Load Balancer sao cho subnet web, database và hadoop vào **Route-Private**; subnet LB vào **Route-Public**.

---

## **Truy cập Ứng Dụng**

Sau khi hoàn tất các bước trên, bạn có thể truy cập ứng dụng của mình qua địa chỉ IP Public của EC2 Web Server:
- **HTTP**: `http://34.201.175.137/`
- **HTTPS**: `https://34.201.175.137/`

---

