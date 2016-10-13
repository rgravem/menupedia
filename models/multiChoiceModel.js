// schema for users
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var multiSchema = new Schema({
  quizName: {type: String, required: true},
  question: {type: String},
  a: {type: String},
  b: {type: String},
  c: {type: String},
  d: {type: String},
  answer: {type: String}
});

var MultiModel = mongoose.model('multiquestions', multiSchema);
module.exports= MultiModel;
