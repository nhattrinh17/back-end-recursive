const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScientificResearchFeedbackSchema = new Schema({
    IdArticleOrExam: { type: String, required: true },
    IdUserComment: { type: String, required: true },
    commnet: { type: String, required: true },
    countLike: { type: Number, default: null },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('scientificResearchFeedback', ScientificResearchFeedbackSchema);
