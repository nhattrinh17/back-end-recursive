const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserTokenSchema = {
    idUser: { type: String, require: true },
};
