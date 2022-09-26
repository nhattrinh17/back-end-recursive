const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
        image: Buffer,
        contentType: String,
    },
    codeSudentOrLecturers: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
    isInstructor: { type: Boolean, default: false },
    isExamTeacher: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date },
});

module.exports = mongoose.model('user', UserSchema);
