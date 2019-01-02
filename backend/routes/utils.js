var express = require('express');
var router = express.Router();

//Import Controllers
const TagController = require('../controllers/utils/TagController');

router.get('/tags', TagController.getTags);

module.exports = router;
