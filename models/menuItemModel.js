// schema for menu items
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuItemSchema = new Schema({
  category: {type: String, enum: ['appetizer', 'salad', 'entree', 'dessert', 'sauce']},
  name: {type: String, required: true},
  ingredients: {type: String, required: true},
  sauces: String,
  allergies: {type: String, required: true},
  accomidation: String,
});

var MenuItemModel = mongoose.model('menuitems', menuItemSchema);
module.exports= MenuItemModel;
