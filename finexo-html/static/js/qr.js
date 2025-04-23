const express = require('express');
const bodyParser = require('body-parser');
const { QRPay, BanksObject } = require('vietnam-qr-pay');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001; // Chạy Node.js ở cổng riêng

app.use(cors());
app.use(bodyParser.json());

app.post('/generate_qr', async (req, res) => {
  const { amount, memo } = req.body;

  // In log khi API được gọi
  console.log('🚀 API /generate_qr đã được gọi');

  try {
    const qrPay = QRPay.initVietQR({
      bankBin: BanksObject.techcombank.bin,
      bankNumber: '6204080304',
      amount: amount.toString(),
      purpose: memo
    });

    const content = qrPay.build();
    const filename = `vietqr_${Date.now()}.png`;

    const outputPath = path.join(__dirname, '..', '..', 'static', 'qr_codes', filename);

    // In đường dẫn ra console để kiểm tra
    console.log('📂 Đường dẫn lưu ảnh QR:', outputPath);

    // Tạo thư mục nếu chưa có
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Tạo mã QR và lưu vào đường dẫn
    await qrcode.toFile(outputPath, content);

    console.log('✅ Mã QR đã được tạo:', filename);
    res.json({ filename });
  } catch (err) {
    console.error('❌ Lỗi tạo QR:', err);
    res.status(500).json({ error: 'Failed to generate QR' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Node server is running at http://localhost:${PORT}`);
});
