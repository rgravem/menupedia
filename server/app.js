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
var User = require('../models/userModel.js');

app.listen(port, function(){
  console.log('server up on 3000');
});

app.get('/test', function(req, res) {
  var dummyItem = new User({
    name: "Ross Gravem",
    email: "rossgravem@gmail.com",
    role: "4"
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
  Menuitem.find({category:{$in:["appetizer"]}}, function(err, items){
    if(err){
    console.log('error getting item');
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting items');
    res.send(items);
    }
  }); // end find
}); // end get call

app.get('/salads', function(req, res){
  console.log('in get salads');
  Menuitem.find({category:{$in:["salad"]}}, function(err, items){
    if(err){
    console.log('error getting item');
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting items');
    res.send(items);
    }
  }); // end find
}); // end get call

app.get('/entrees', function(req, res){
  console.log('in get entrees');
  Menuitem.find({category:{$in:["entree"]}}, function(err, items){
    if(err){
    console.log('error getting item');
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting items');
    res.send(items);
    }
  }); // end find
}); // end get call

app.get('/sauces', function(req, res){
  console.log('in get sauces');
  Menuitem.find({category:{$in:["sauce"]}}, function(err, items){
    if(err){
    console.log('error getting item');
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting items');
    res.send(items);
    }
  }); // end find
}); // end get call

app.get('/desserts', function(req, res){
  console.log('in get desserts');
  Menuitem.find({category:{$in:["dessert"]}}, function(err, items){
    if(err){
    console.log('error getting item');
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting items');
    res.send(items);
    }
  }); // end find
}); // end get call

app.get('/items', function(req, res){
  console.log('q is:', req.query.q);
  var query = req.query.q;
  console.log('query:', query);
  Menuitem.find({"name": { $regex: query, $options: '-i'}}, function(err, items){
    if(err){
      console.log('error getting item');
      res.sendStatus(500);
    }else{
      console.log('got these items:', items);
      res.send(items);
    }
  });
});

app.post('/checkUser', urlencodedParser, bpJason, function(req, res){
  console.log('checking user:', req.body);
  User.find({email:{$in:[req.body.email]}}, function(err, role){
    if(err){
      console.log('error getting role');
      res.sendStatus(500);
    }else{
      console.log('got this role:', role);
      res.send(role);
    }
  });
});

app.post('/addUser', urlencodedParser, bpJason, function(req, res){
  console.log('adding user:', req.body);
  User.create
});

app.get("/*", function(req,res){
    console.log("Here is the property: ", req.params[0]);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
