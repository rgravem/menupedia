// schema for menu items
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: {type: String, required: true},
  ingredients: {type: String, required: true},
  sauces: String,
  allergies: {type: String, required: true},
  accomidation: String,
});
