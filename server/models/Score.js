const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    level: { type: Number, default: 1 },
});

module.exports = mongoose.model('Score', scoreSchema);