const mongoose = require('mongoose');

const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, require: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('department', DepartmentSchema);
