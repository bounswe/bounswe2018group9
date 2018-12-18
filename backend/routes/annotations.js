var express = require('express');
var router = express.Router();

//Import Controllers
const AnnotationController = require('../controllers/AnnotationController');

router.post('/', AnnotationController.addAnnotation);
router.get('/:id', AnnotationController.getAnnotation);
router.put('/:id', AnnotationController.updateAnnotation);
router.delete('/:id', AnnotationController.deleteAnnotation);
router.get('/page',AnnotationController.getAnnotationsofPage);

module.exports = router;
