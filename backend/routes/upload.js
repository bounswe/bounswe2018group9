var express = require('express');
var router = express.Router();

var UploadController = require('../controllers/UploadController');

router.post('/', UploadController.upload);

module.exports = router;
