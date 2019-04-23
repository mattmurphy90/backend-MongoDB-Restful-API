const mongoose = require('mongoose');
const WineSchema = new mongoose.Schema({
  wineName: String,
  year: Number,
  row: Number,
  column: Number,
  bestBy: String,
  size: String,
  type: String,
  color: String,
  body: String,
  region: String,
});
module.exports = mongoose.model('MattWine', WineSchema);
