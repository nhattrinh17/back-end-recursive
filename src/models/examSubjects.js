const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSubjectsSchema = new Schema({
    name: { type: String, required: true },
    school: { type: String, required: true },
    userCreate: { type: String, required: true },
    imgSchool: {
        data: Buffer,
        contentType: String,
    },
    idDepartment: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('examSubjects', ExamSubjectsSchema);
