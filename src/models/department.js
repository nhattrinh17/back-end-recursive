const mongoose = require('mongoose');

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('department', DepartmentSchema);
