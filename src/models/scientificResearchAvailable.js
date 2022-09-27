const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScientificResearchAvailableSchema = new Schema({
    idUser: { type: String, required: true },
    name: { type: String, required: true, text: true },
    description: { type: String, required: true, text: true },
    image: {
        data: Buffer,
        contentType: String,
    },
    countLike: { type: Number, default: null },
    scored: { type: Number, required: true },
    createAt: { type: Date, default: Date.now },
});

// ScientificResearchAvailableSchema.plugin(textSearch);
// ScientificResearchAvailableSchema.index({ name: 'text' });

module.exports = mongoose.model('scientificResearchAvailable', ScientificResearchAvailableSchema);
