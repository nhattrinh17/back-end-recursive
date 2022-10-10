const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamAndResearchFeedbackSchema = new Schema({
    idArticleOrExam: { type: String, required: true },
    idUserComment: { type: String, required: true },
    commnet: { type: String, required: true },
    countLike: { type: Number, default: null },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('examAndResearchFeedback', ExamAndResearchFeedbackSchema);
