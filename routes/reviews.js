const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/games/:gameId', reviewsCtrl.create);
router.delete("/games/:gameId", reviewsCtrl.delete)
module.exports = router;