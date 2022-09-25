const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserTokenSchema = new Schema({
    idUser: { type: String, require: true },
    tokenUser: { type: String, require: true },
});

module.exports = mongoose.model('userToken', UserTokenSchema);
