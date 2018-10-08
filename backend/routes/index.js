// This is for the home page.
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the homepage, angular will be served from here. For API Endpoints please refer to /api/COLLECTION_NAME');
});

module.exports = router;
