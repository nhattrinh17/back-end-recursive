const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSchema = new Schema({
    idExamSubject: { type: String, required: true },
    fileExam: {
        data: Buffer,
        contentType: String,
    },
    userPost: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('exam', ExamSchema);
