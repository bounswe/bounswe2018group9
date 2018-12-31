var express = require('express');
var router = express.Router();
const passport = require('passport');

//Import Controllers
const AnnotationController = require('../controllers/AnnotationController');

router.post('/', passport.authenticate('jwt', {session: false}), AnnotationController.addAnnotation);
router.get('/', AnnotationController.getAnnotationsofPage);
router.get('/:id', AnnotationController.getAnnotation);
router.put('/:id', passport.authenticate('jwt', {session: false}), AnnotationController.updateAnnotation);
router.delete('/:id', passport.authenticate('jwt', {session: false}), AnnotationController.deleteAnnotation);


module.exports = router;
