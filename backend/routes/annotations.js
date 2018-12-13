var express = require('express');
var router = express.Router();

//Import Controllers
const AnnotationController = require('../controllers/AnnotationController');

router.post('/', AnnotationController.addAnnotation);
router.get('/:id', AnnotationController.getAnnotation);

module.exports = router;
