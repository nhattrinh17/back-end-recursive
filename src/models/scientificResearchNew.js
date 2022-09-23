const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScientificResearchNewSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    image: {
        data: Buffer,
        contentType: String,
    },
    studentLeader: { type: String, required: true },
    listStudentParticipating: { type: String, required: true },
    instructor: { type: String, required: true },
    countLike: { type: Int8Array, default: null },
    scored: { type: Int8Array, default: null },
    submited: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('scientificResearchNew', ScientificResearchNewSchema);
