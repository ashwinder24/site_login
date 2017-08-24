//express
const express= require('express');
const app= express();

//mustache
const mustache= require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');

//session and body parser
const session= require('express-session');
const body= require('body-parser');
app.use(body.urlencoded({
  extended: true
}));

//require validator
const validator= require('express-validator');
app.use(validator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialize: true
}));

//middleware: declare userList with usernames and passwords
app.use(function(req, res, next){
  req.session.userList={
    peter: "theGiant02",
    steve: "bornToCode",
    liana: "helloWorld7",
    berna: "theSmarty123"
  };
  next();
});

app.get('/', function(req, res){
  if(req.session.username){
    res.send("Hello, "+req.session.username);
  }
  else{
    res.redirect('/login');
  }
});

app.get('/login', function(req, res){
  res.render("login");
});

app.post('/login', function(req,res){
  req.checkBody('username', 'Username cannot be empty').notEmpty();
  req.checkBody('password', 'Password cannot be empty').notEmpty();
  var errors= req.validationErrors();
  if(errors){
    var html='<h1>Oops! You forgot to add the info!!!</h1>';
    res.send(html);
   }
  if (req.session.userList[req.body.username] === req.body.password) {
      req.session.username = req.body.username;
    }
  res.redirect('/');
});

app.listen(3000, function(){
  console.log("Server Started...");
});
