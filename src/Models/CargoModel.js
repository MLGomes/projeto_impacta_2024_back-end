const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CargoSchema = new Schema({
  id : ObjectId,
  cargo: String,
  created: Date
});

const CargoModel = mongoose.model('cargos', CargoSchema);

module.exports = CargoModel;