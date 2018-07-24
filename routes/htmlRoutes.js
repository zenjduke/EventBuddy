var db = require("../models");

module.exports = function(app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("index", { user: req.user });
    // , {
    // msg: "Welcome!",
    // examples: dbExamples
    // });
    // });
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });
  //assets/img/concert1.jpg

  app.get("/discover", function(req, res) {
    const a = {
      user: req.user,
      events: [
        {
          title: "foo",
          image: { medium: { url: "assets/img/concert1.jpg" } }
        }
      ]
    };
    console.log(a);
    res.render("discover", a);
  });

  app.get("/account-setup", function(req, res) {
    res.render("account-setup", { user: req.user });
  });

  app.put("/api/users", function(req, res) {
    console.log("made it");
    db.User.update(
      {
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        email: req.body.email,
        profilepic: req.body.profilepic,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        gplus: req.body.gplus,
        venue: req.body.venue,
        groupsize: req.body.groupsize,
        eventtype: req.body.eventtype
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form

  app.get("/login", function(req, res) {
    if (req.user) {
      res.render("login", { isUserLoggedIn: true });
    } else {
      res.render("login", {
        isUserLoggedIn: false,
        message: req.flash("loginMessage")[0]
      });
    }
    // render the page and pass in any flash data if it exists
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function(req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form

  // app.get('/signup', function(req, res) {
  // 	console.log(req.flash('signupMessage')[0]);
  // 	// render the page and pass in any flash data if it exists
  // 	res.render('signup', { message: req.flash('signupMessage')[0]});
  // });

  app.get("/signup", function(req, res) {
    if (req.user) {
      console.log(req.user);
      res.render("signup", { isUserLoggedIn: true });
    } else {
      res.render("signup", {
        isUserLoggedIn: false,
        message: req.flash("signupMessage")[0]
      });
    }
    // render the page and pass in any flash data if it exists
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/account-setup", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  app.get("/login", function(req, res) {
    if (req.user) {
      res.render("login", { isUserLoggedIn: true });
    } else {
      res.render("login", {
        isUserLoggedIn: false,
        message: req.flash("loginMessage")[0]
      });
    }
    // render the page and pass in any flash data if it exists
  });

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)

  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile", { user: req.user }); // get the user out of session and pass to template
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/events", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("event-list");
    // , {
    // msg: "Welcome!",
    // examples: dbExamples
    // });
    // });
  });

  app.get("/live", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("events-now");
    // , {
    // msg: "Welcome!",
    // examples: dbExamples
    // });
    // });
  });

  app.get("/check-in", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    res.render("event-checkin");
    // , {
    // msg: "Welcome!",
    // examples: dbExamples
    // });
    // });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}

// if (user) {

//   } else {
// 	$(".myprofile").hide();
// 	$(".logout").hide();
// 	$(".login").show();
// 	$(".signup").show();
// };

// $(".myprofile").show();
// 		$(".logout").show();
// 		$(".login").hide();
// 		$(".signup").hide();

// app.get("/discover", function(req, res) {
//   // db.Example.findAll({}).then(function(dbExamples) {
//     res.render("discover");
//     // , {
//       // msg: "Welcome!",
//       // examples: dbExamples
//     // });
//   // });
// })

// app.get("/events", function(req, res) {
//   // db.Example.findAll({}).then(function(dbExamples) {
//     res.render("event-list");
//     // , {
//       // msg: "Welcome!",
//       // examples: dbExamples
//     // });
//   // });
// })

// app.get("/live", function(req, res) {
//   // db.Example.findAll({}).then(function(dbExamples) {
//     res.render("events-now");
//     // , {
//       // msg: "Welcome!",
//       // examples: dbExamples
//     // });
//   // });
// })

// app.get("/check-in", function(req, res) {
//   // db.Example.findAll({}).then(function(dbExamples) {
//     res.render("event-checkin");
//     // , {
//       // msg: "Welcome!",
//       // examples: dbExamples
//     // });
//   // });
// })

//   // // Load example page and pass in an example by id
//   // app.get("/profile/:id", function(req, res) {
//   //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//   //     res.render("example", {
//   //       example: dbExample
//   //     });
//   //   });
//   // });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };

// };

// // Load example page and pass in an example by id
// app.get("/profile/:id", function(req, res) {
//   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//     res.render("example", {
//       example: dbExample
//     });
//   });
// });
