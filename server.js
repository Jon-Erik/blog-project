var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser")
var env = require("dotenv").load();
var exphbs = require("express-handlebars");



//middleware to process requests in easier format
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use static public files for css, js
app.use(express.static(__dirname + "/public"));
app.use(express.static("."));

//middleware for authentication initialized with passport: passport, express 
//session, and passport session
app.use(session({
	secret: "fagottist",
	resave: true,
	saveUnitialized: true
}));

app.use(passport.initialize());

app.use(passport.session()); //allows for persistent login sessions

//set up handlebars to display views
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

const models = require("./models");
//routes imported
var authRoute = require('./routes/auth.js')(app, passport);

//load passport strategies
require("./config/passport/passport.js")(passport, models.User);


//sync all models and then once connected, app listening on local or process.env port
models.sequelize.sync().then(function() {
	app.listen(PORT, function(err) {
		if (!err) {
			console.log("Server listening on localhost://" + PORT);
		} else {
			console.log(err);
		}	
	});
}).catch(function(err) {
	console.log(err);
})

