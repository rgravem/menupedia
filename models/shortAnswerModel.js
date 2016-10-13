// schema for users
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shortSchema = new Schema({
  quizName: {type: String, required: true},
  question: {type: String},
  answer: {type: String}
});

var ShortModel = mongoose.model('shortAnswerquestions', shortSchema);
module.exports= ShortModel;
