const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id : ObjectId,
    profile_id: String,
    name: String,
    cpf: String,
    email: String,
    status: String,
    cargo: String,
    password: String,
    created: Date
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;