const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    IdArticleOrExam: { type: String, require: true },
    IdUserComment: { type: String, require: true },
    commnet: { type: String, require: true },
    countLike: { type: Int8Array, default: null },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('feedback', FeedbackSchema);
