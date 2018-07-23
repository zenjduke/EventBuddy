var db = require("../models");

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
      res.render("index");
      // , {
        // msg: "Welcome!",
        // examples: dbExamples
      // });
    // });
  })

  app.get("/home", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
      res.render("index");
      // , {
        // msg: "Welcome!",
        // examples: dbExamples
      // });
    // });
  })


app.get("/discover", function(req, res) {
  // db.Example.findAll({}).then(function(dbExamples) {
    res.render("discover");
    // , {
      // msg: "Welcome!",
      // examples: dbExamples
    // });
  // });
})

app.get("/events", function(req, res) {
  // db.Example.findAll({}).then(function(dbExamples) {
    res.render("event-list");
    // , {
      // msg: "Welcome!",
      // examples: dbExamples
    // });
  // });
})

app.get("/live", function(req, res) {
  // db.Example.findAll({}).then(function(dbExamples) {
    res.render("events-now");
    // , {
      // msg: "Welcome!",
      // examples: dbExamples
    // });
  // });
})

app.get("/check-in", function(req, res) {
  // db.Example.findAll({}).then(function(dbExamples) {
    res.render("event-checkin");
    // , {
      // msg: "Welcome!",
      // examples: dbExamples
    // });
  // });
})

  // // Load example page and pass in an example by id
  // app.get("/profile/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};