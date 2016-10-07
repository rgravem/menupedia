// schema for users
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: Number, required: true}
});

var UserModel = mongoose.model('users', userSchema);
module.exports= UserModel;
