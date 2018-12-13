var express = require('express');
var router = express.Router();

//Import Controllers
const AnnotationController = require('../controllers/AnnotationController');

router.post('/', AnnotationController.addAnnotation);

module.exports = router;
