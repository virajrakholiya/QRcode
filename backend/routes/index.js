var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const qrcodeController = require('../controller/qrcodeController');
/* GET home page. */
router.post('/', auth, qrcodeController.generateQRCode);

module.exports = router;
