const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/signin', AuthController.login);
router.post('/signup', AuthController.register);

module.exports = router;
