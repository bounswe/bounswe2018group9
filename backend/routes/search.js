const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/SearchController');

router.get('/', SearchController.search);
router.get('advanced', SearchController.advancedSearch);

module.exports = router;