const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSchema = new Schema({
    idExamSubject: { type: String, required: true },
    idDepartment: { type: String, required: require },
    fileExam: {
        image: Buffer,
        contentType: String,
    },
    iduserPost: { type: String, required: true },
    userPost: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('exam', ExamSchema);
