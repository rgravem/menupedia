// schema for users
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  quizName: {type: String, required: true},
});

var QuizModel = mongoose.model('quiznames', quizSchema);
module.exports= QuizModel;
