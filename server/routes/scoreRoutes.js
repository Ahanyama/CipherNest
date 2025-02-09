const express = require('express');
const router = express.Router();
const { updateScore } = require('../controllers/scoreController');

router.post('/update', updateScore);

module.exports = router;