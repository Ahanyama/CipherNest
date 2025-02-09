const express = require('express');
const router = express.Router();
const { fetchQuestions } = require('../controllers/questionController');

router.get('/fetch', fetchQuestions);

module.exports = router;