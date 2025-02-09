const Question = require('../models/Question');

exports.fetchQuestions = async (req, res) => {
    try {
        const { level } = req.query;
        const questions = await Question.find({ level }).limit(10).sort({ _id: 'asc' });

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};