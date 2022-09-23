const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSubjectsSchema = new Schema({
    name: { type: String, require: true },
    school: { type: String, require: true },
    userCreate: { type: String, require: true },
    imgSchool: {
        data: Buffer,
        contentType: String,
    },
    idDepartment: { type: String, require: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('examSubjects', ExamSubjectsSchema);
