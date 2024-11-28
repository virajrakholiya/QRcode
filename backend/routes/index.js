var express = require('express');
var router = express.Router();
const qrcodeController = require('../controller/qrcodeController');
/* GET home page. */
router.post('/', qrcodeController.generateQRCode);

module.exports = router;
