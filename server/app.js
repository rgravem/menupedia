var express= require('express');
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: true } );
var bpJason = bodyParser.json();
var mongoose = require('mongoose');
var path = require('path');
var port = process.env.PORT || 3000;
var mongoURI = 'mongodb://localhost:27017/menuItems';
mongoose.connect(mongoURI);

app.use( express.static( 'public' ) );

var Menuitem = require('../models/menuItemModel.js');

app.listen(port, function(){
  console.log('server up on 3000');
});

app.get('/test', function(req, res) {
  var dummyItem = new Menuitem({
    category: 'appetizer',
    name: 'Ahi Crisps',
    ingredients: 'lavosh crackers, ahi tuna, sesame seeds, radish',
    sauces: 'ponzu sauce, smoked pepper aioli',
    allergies: 'dairy, gluten',
    accomidation: 'GF',
  });

  dummyItem.save(function(err) {
    if(err){
      console.log('error occurred:', err);
      res.sendStatus(500);
    }else{
      // created
      res.sendStatus(201);
    }
  }); //end of save
}); //end of test get

app.get('/appetizers', function(req, res){
  console.log('in get appetizers');
  Menuitem.find({}, function(err, items){
    if(err){
    console.log('error getting item');
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting items');
    res.send(items);
    }
  }); // end find
}); // end get call

app.get("/*", function(req,res){
    console.log("Here is the property: ", req.params[0]);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
