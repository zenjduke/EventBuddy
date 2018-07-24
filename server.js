// set up ======================================================================
// get all the tools we need

var express = require("express");
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var morgan = require('morgan');
var app = express();
var PORT = process.env.PORT || 8080;

var passport = require('passport');
var flash = require('connect-flash');

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// Import routes and give the server access to them.

// require("./routes/apiRoutes.js")(app, passport);
require("./routes/htmlRoutes.js")(app, passport);


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("The magic happens on: 🌎 http://localhost:" + PORT);
});



