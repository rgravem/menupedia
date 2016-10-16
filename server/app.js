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
var Multi = require('../models/multiChoiceModel.js');
var Short = require('../models/shortAnswerModel.js');
var Quiz = require('../models/quizModel.js');

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

app.get('/showAll', function(req, res){
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

app.get('/getQuizzes', function(req, res){
  console.log('in get quizzes');
  Quiz.find({}, function(err, items){
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
}); // end search

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
}); // end checkUser

app.post('/addUser', urlencodedParser, bpJason, function(req, res){
  console.log('adding user:', req.body);
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  });
  newUser.save(function(err, user){
    if (err) {
      console.log('err saving item:', err);
      res.sendStatus(500);
    }else{
      console.log('item saved successfully');
      res.send(user);
    }
  }); // end of save new user
}); // end of add user post call

app.post('/addNewItem', urlencodedParser, bpJason, function(req, res){
  console.log('adding new item:', req.body.category);
  console.log(req.body.name);
   var addMenuItem = new Menuitem({
    category: req.body.category,
    name: req.body.name,
    ingredients: req.body.ingredients,
    sauces: req.body.sauces,
    allergies: req.body.allergies,
    accomidation: req.body.accomidations
}); // end new Menuitem
addMenuItem.save(function(err, newItem){
  if (err) {
    console.log('err saving item:', err);
    res.sendStatus(500);
  }else{
    console.log('item created:', newItem);
    res.send(newItem);
  }
});
}); // end addNewItem

app.post('/addQuiz', urlencodedParser, bpJason, function(req, res){
  console.log('from client:', req.body);
  var newQuiz = new Quiz({
    quizName: req.body.quizname,
  }); // end newQuiz
  newQuiz.save(function(err, newQuiz){
    if(err) {
      console.log('err saving quiz:', err);
    }else{
      console.log('quiz created:', newQuiz);
      res.send(newQuiz);
    }
  });
}); // end addQuizShor

app.post('/addQuizShort', urlencodedParser, bpJason, function(req, res){
  console.log('from client:', req.body);
  var newQuestionShort = new Short({
    quizName: req.body.quizname,
    question: req.body.question,
    answer: req.body.answer,
  }); // end new quiz question
  newQuestionShort.save(function(err, newQuestion){
    if(err) {
      console.log('err saving question:', err);
    }else{
      console.log('question created:', newQuestion);
      res.send(newQuestion);
    }
  });
}); // end addQuizShort

app.post('/addQuizMulti', urlencodedParser, bpJason, function(req, res){
  console.log('from client:', req.body);
  var newQuestionMulti = new Multi({
    quizName: req.body.quizname,
    question: req.body.question,
    a: req.body.a,
    b: req.body.b,
    c: req.body.c,
    d: req.body.d,
    answer: req.body.answer
  }); // end newQuestionMulti
  newQuestionMulti.save(function(err, newQuestion){
    if(err){
      console.log('err saving question:', err);
    }else{
      console.log('question created:', newQuestion);
      res.send(newQuestion);
    }
  });
}); // end addQuizMulti

app.post('/findQuiz', urlencodedParser, bpJason, function(req, res){
  console.log('from client:', req.body);
  Short.find({quizName:{$in:[req.body.quizname]}}, function(err, questions){
    if(err){
    console.log('error:', err);
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting questions:', questions);
    res.send(questions);
    }
  }); // end find
});

app.post('/findMulti', urlencodedParser, bpJason, function(req, res){
  console.log('from client:', req.body);
  Multi.find({quizName:{$in:[req.body.quizname]}}, function(err, questions){
    if(err){
    console.log('error:', err);
    res.sendStatus(500);
    } else{
    console.log('succeeded in getting questions:', questions);
    res.send(questions);
    }
  }); // end find
});

app.delete('/deleteItem', urlencodedParser, bpJason, function(req, res){
  console.log('hit delete on:', req.body);
  Menuitem.findByIdAndRemove(req.body.id, function(err, results){
  if(err){
    console.log('error:', err);
  }else{
    console.log('successfully deleted item');
    res.sendStatus(200);
  }
});
}); // end deleteItem

app.get('/enum', function(req, res) {
  console.log('enum get hit');
  res.send(Menuitem.schema.path('category').enumValues);
});

app.get("/*", function(req,res){
    console.log("Here is the property: ", req.params[0]);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
