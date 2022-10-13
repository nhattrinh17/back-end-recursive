const mongoose = require('mongoose');

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

DepartmentSchema.index({ name: 'text' });
module.exports = mongoose.model('department', DepartmentSchema);
