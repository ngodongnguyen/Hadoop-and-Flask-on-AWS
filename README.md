Rõ rồi. Đây là file **README.md** đầy đủ, gộp chung một khối duy nhất, bạn copy một lần là xong:

```markdown
# Hadoop and Flask on AWS 🚀

A step-by-step guide to deploying a **multi-node Hadoop cluster** with a **Flask web application** on **AWS EC2**.  
This project covers VPC, Subnets, Hadoop Master/Slave setup, Web Server deployment, SSL configuration, and Load Balancer integration.

---

## 📖 Table of Contents
- [Introduction](#introduction)
- [Architecture](#architecture)
- [Deployment Steps](#deployment-steps)
- [Access Application](#access-application)
- [References](#references)

---

## Introduction

This project demonstrates how to:
- Deploy a **multi-node Hadoop cluster** (1 Master + 3 Slaves).  
- Configure **VPC, Subnets, Route Tables, Internet Gateway**.  
- Install and run **Apache2 + Flask (via WSGI)**.  
- Configure **MySQL Database**.  
- Enable **SSL certificates**.  
- Scale with an **Application Load Balancer (ALB)**.

---

## Architecture

```

VPC (10.0.0.0/16)
│
├── Subnet: Hadoop (Private) – Master/Slaves
├── Subnet: Web (Private) – Flask App
├── Subnet: Database (Private) – MySQL
└── Subnet: Load Balancer (Public) – ALB

````

---

## Deployment Steps

### Step 1: Create VPC
- Name: `Hadoop`  
- CIDR: `10.0.0.0/16`

### Step 2: Create Subnets
- Hadoop Subnet → `10.0.1.0/24`  
- Web Subnet → `10.0.2.0/24`  
- Database Subnet → `10.0.3.0/24`  
- Load Balancer Subnet → `10.0.4.0/24`  

### Step 3: Public Route Table
- Name: `Public-router`  
- Associate all subnets.  

### Step 4: Internet Gateway
- Name: `Hg-ig`  
- Route `0.0.0.0/0` → `Internet Gateway`.  

### Step 5: Install Hadoop
```bash
sudo apt update
# follow: https://www.mssqltips.com/sqlservertip/7877/build-multi-node-apache-hadoop-cluster-aws-ec2/
````

### Step 6: Install Web Server

```bash
sudo apt install apache2 libapache2-mod-wsgi-py3
sudo a2enmod wsgi ssl
```

Setup Flask app:

```bash
mkdir /var/www/flaskapp
cd /var/www/flaskapp
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt flask_mail qrcode pymysql
```

### Step 7: Configure WSGI

File: `/var/www/flaskapp/flaskapp.wsgi`

```python
import sys, logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/var/www/flaskapp/venv/lib/python3.12/site-packages')
sys.path.insert(0, '/var/www/flaskapp')
from index import app as application
```

Apache config: `/etc/apache2/sites-available/flaskapp.conf`

```apache
<VirtualHost *:80>
    ServerName 34.201.175.137
    DocumentRoot /var/www/flaskapp
    WSGIProcessGroup flaskapp
    WSGIScriptAlias / /var/www/flaskapp/flaskapp.wsgi
    <Directory /var/www/flaskapp>
        Require all granted
    </Directory>
</VirtualHost>
```

### Step 8: Enable SSL

Generate certificate:

```bash
sudo openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 \
-keyout /etc/ssl/private/apache.key -out /etc/ssl/certs/apache.crt
```

Apache SSL config: `/etc/apache2/sites-available/flaskapp-ssl.conf`

```apache
<VirtualHost *:443>
    ServerName 34.201.175.137
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache.crt
    SSLCertificateKeyFile /etc/ssl/private/apache.key
    WSGIDaemonProcess flaskapp python-path=/var/www/flaskapp:/var/www/flaskapp/venv/lib/python3.8/site-packages
    WSGIProcessGroup flaskapp
    WSGIScriptAlias / /var/www/flaskapp/flaskapp.wsgi
    <Directory /var/www/flaskapp>
        Require all granted
    </Directory>
</VirtualHost>
```

### Step 9: Load Balancer

* Create AMI from Web Server.
* Launch second instance from AMI.
* Create **Target Group**.
* Create **ALB** and attach Target Group.

---

## Access Application

* HTTP: `http://34.201.175.137/`
* HTTPS: `https://34.201.175.137/`

---

## References

* [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
* [Apache Hadoop on AWS EC2](https://www.mssqltips.com/sqlservertip/7877/build-multi-node-apache-hadoop-cluster-aws-ec2/)
* [Flask WSGI Deployment](https://flask.palletsprojects.com/en/stable/deploying/mod_wsgi/)

