var db = require("../models");

module.exports = function(app, passport) {

		// =====================================
		// HOME PAGE (with login links) ========
		// =====================================

		app.get("/", function(req, res) {
			if (req.user) {
				res.render('index', { isHome: true, isUserLoggedIn: true, user: req.user});
			}
			else {
				res.render('index', { isHome: true, isUserLoggedIn: false, user: req.user});
			}
			// render the page and pass in any flash data if it exists
		})

		app.get("/home", function(req, res) {
			if (req.user) {
				res.render('index', { isHome: true, isUserLoggedIn: true, user: req.user});
			}
			else {
				res.render('index', { isHome: true, isUserLoggedIn: false, user: req.user});
			}
			// render the page and pass in any flash data if it exists
		})

		// =====================================
		// SIGNUP ==============================
		// =====================================
		// show the signup form

		app.get('/signup', function(req, res) {
			res.render('signup', { isUserLoggedIn: false, message: req.flash('signupMessage')[0]});
		})	

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/account-setup', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}))

		// =====================================
		// Account Set Up (shown after initial signup/user creation page) ========
		// =====================================

		app.get("/account-setup", function(req, res) {
			res.render("account-setup", { isUserLoggedIn: false, user: req.user});
		})

		app.put("/api/users", function(req, res) {
			db.User.update({
				fname: req.body.fname,
				lname: req.body.lname,
				phone: req.body.phone,
				email: req.body.email,
				profilepic: req.body.profilepic,
				twitter: req.body.twitter,
				facebook: req.body.facebook,
				gplus: req.body.gplus,
				venue: req.body.venue,
				eventtype: req.body.eventtype,
			}, 
			{
				where: {
					id: req.body.id
				}
			})
				.then(function(dbUser){
					console.log("User updated.");
					res.json(dbUser);
				});
		})
		// =====================================
		// LOGIN ===============================
		// =====================================
		// show the login form

		app.get('/login', function(req, res) {
			if (req.user) {
				res.render('login', { ifUserLoggedIn: true});
			}
			else {
				res.render('login', { ifUserLoggedIn: false, message: req.flash('loginMessage')[0]});
			}
			// render the page and pass in any flash data if it exists
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
				successRedirect : '/profile', // redirect to the secure profile section
				failureRedirect : '/login', // redirect back to the signup page if there is an error
				failureFlash : true // allow flash messages
			}),
			function(req, res) {
				console.log("Hello!");

				if (req.body.remember) {
					req.session.cookie.maxAge = 1000 * 60 * 3;
				} else {
					req.session.cookie.expires = false;
				}
			res.redirect('/');
		});

		
		// =====================================
		// Check-In/Discover Pages 
		// =====================================
		
		
		
		app.get("/check-in", function(req, res) {
			if (req.user) {
				res.render('event-checkin', { isUserLoggedIn: true, user: req.user});
			}
			else {
				res.render('event-checkin', { isUserLoggedIn: false, user: req.user});
			}	
		})

		app.get("/discover", function(req, res) {
			if (req.user) {
				console.log(req.user);
				res.render('discover', {isUserLoggedIn: true, user: req.user});
			}
			else {
				console.log(req.user);
				res.render('discover', {isUserLoggedIn: false, user: req.user});
			}	
		})

		// =====================================
		// LOGOUT ==============================
		// =====================================

		app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
		});

		// =====================================
		// API Routes
		// =====================================

		// GET route for getting all of the Events
		app.get("/api/events", function(req, res) {
			db.Event.findAll({
				}).then(function(dbEvent) {
					console.log(dbEvent);
					res.json(dbEvent);
				})
		})
			
			
			// var query = {};
			// if (req.query.user_id) {
			// 	query.UserId = req.query.User_id;
			// }
			// db.Event.findAll({
			// 	where: query
			// }).then(function(dbEvent) {
			// 	res.json(dbEvent);
			// })
			// })
	
	    // Get route for retrieving a single Event
	    app.get("/api/events/:id", function(req, res) {
			db.Event.findOne({
				where: {
				id: req.params.id
				}
			}).then(function(dbEvent) {
				console.log(dbEvent);
				res.json(dbEvent);
			})
	    })
	
	    // Event route for saving a new Event
	    app.post("/api/events", function(req, res) {
			db.Event.create(req.body).then(function(dbEvent) {
				res.json(dbEvent);
			})
	    })
	
	    // PUT route for updating Events
	    app.put("/api/events", function(req, res) {
			db.Event.update(
				req.body,
				{
				where: {
					id: req.body.id
				}
				}).then(function(dbEvent) {
				res.json(dbEvent);
			})
		})

	    // DELETE route for deleting Events
	    app.delete("/api/Events/:id", function(req, res) {
				db.Event.destroy({
					where: {
					id: req.params.id
					}
				}).then(function(dbEvent) {
					res.json(dbEvent);
				})
		})

		// =====================================
		// PROFILE SECTION =========================
		// =====================================
		// we will want this protected so you have to be logged in to visit
		// we will use route middleware to verify this (the isLoggedIn function)

		app.get('/profile', isLoggedIn, function(req, res) {
			if (req.isAuthenticated()) 
			{
				console.log(req.user);
				res.render('profile', { isUserLoggedIn: true, user: req.user});
			}
			else {
				alert("No profile found.")
			}
		})

		// =====================================
		// 404 Error Page ======================
		// =====================================

		// Render 404 page for any unmatched routes
		
		app.get("*", function(req, res) {
			res.render("404");
		});	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}

