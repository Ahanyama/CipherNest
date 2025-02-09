const Score = require('../models/Score');

exports.updateScore = async (req, res) => {
    try {
        const { userId, level } = req.body;
        let score = await Score.findOne({ userId });

        if (!score) {
            score = new Score({ userId, level });
        } else {
            score.level = level;
        }

        await score.save();

        res.status(200).json({ message: 'Score updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};