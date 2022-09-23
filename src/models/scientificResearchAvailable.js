const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScientificResearchAvailableSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    image: {
        data: Buffer,
        contentType: String,
    },
    countLike: { type: Int8Array, default: null },
    scored: { type: Int8Array, default: null },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('scientificResearchAvailable', ScientificResearchAvailableSchema);
