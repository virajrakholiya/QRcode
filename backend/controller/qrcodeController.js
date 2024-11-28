const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
  const { url } = req.body;

  // Validate URL
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const qrCode = await QRCode.toDataURL(url);
    res.json({ data: qrCode });
  } catch (error) {
    console.error("QR Code generation error:", error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};