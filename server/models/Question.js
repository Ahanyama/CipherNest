const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    level: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: Number, required: true },
});

module.exports = mongoose.model('Question', questionSchema);