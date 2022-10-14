const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSchema = new Schema({
    name: { type: String, required: true },
    idDepartment: { type: String, required: true },
    idExamSubject: { type: String, required: true },
    fileExam: {
        data: Buffer,
        contentType: String,
    },
    idUserPost: { type: String, required: true },
    userPost: { type: String, required: true },
    count: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now },
});

ExamSchema.index({ name: 'text' });

module.exports = mongoose.model('exam', ExamSchema);
