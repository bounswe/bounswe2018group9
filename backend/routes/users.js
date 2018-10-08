var express = require('express');
var router = express.Router();

/* GET users listing. Starts after /users */
router.get('/', function(req, res, next) {
  res.send('Userlar burda abi');
});

module.exports = router;
