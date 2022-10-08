const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSchema = new Schema({
    name: { type: String, required: true },
    idExamSubject: { type: String, required: true },
    fileExam: {
        image: Buffer,
        contentType: String,
    },
    iduserPost: { type: String, required: true },
    userPost: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('exam', ExamSchema);
ExamSchema.index({ name: 'text' });
