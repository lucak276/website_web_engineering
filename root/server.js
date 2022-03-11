//config for host and port. Default: http://localhost:3000
const host = 'localhost';
const port = 3000;
//for using environment variables
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

//requirements
const express = require('express');
const server = express();
const path = require('path');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
const fs = require('fs')
//used as a encryption tool for passwords
const bcrypt = require('bcrypt');
const req = require('express/lib/request');
//json file with all of our userdata used for saving our users
//(can later be changed to MongoDB and realized with the mongoose package)
var userdata = require('./userdata.json');
const methodOverride = require('method-override');
server.use(methodOverride('_method'));
server.use("/css", express.static(path.join(__dirname, "css")));
server.use("/assets", express.static(path.join(__dirname, "assets")));
server.use("/pages", express.static(path.join(__dirname, "views")));
server.use("/js", express.static(path.join(__dirname, "js")));
server.use(flash())
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}))
server.use(passport.initialize())
server.use(passport.session())
//Our server is listening on localhost port 3000
server.listen(port)
server.use(express.urlencoded({ extended: false }));
console.log(`Server is running on http://${host}:${port}`);

//call for initializing user
initialize();

//defining view engine for website
server.set('view-engine', 'ejs');


//root is index.ejs
server.get('/', (req, res) => {
	res.render('index.ejs', {
		isAuth: req.isAuthenticated(),
	});
})

//loginpage
//isNOtAuth noch adden hier und für register
server.get('/login', isNotAuth, (req, res) => {
	res.render('loginpage.ejs',);
})

server.post('/login', passport.authenticate('local', {
	successRedirect: '/projects',
	failureRedirect: '/login',
	failureFlash: true
}))


//prefrencespage
server.get('/preferences', isAuth, (req, res) => {
	res.render('preferences.ejs',{
		isAuth: req.isAuthenticated(),
	});
})

//aboutuspage
server.get('/aboutus', (req, res) => {
	res.render('aboutus.ejs',{
		isAuth: req.isAuthenticated(),
	})
})


//impressum
server.get('/impressum', (req, res) => {
	res.render('impressum.ejs',{
		isAuth: req.isAuthenticated(),
	})
})


//projectpage
server.get('/projects', isAuth, (req, res) => {
	res.render('projects.ejs',{
		isAuth: req.isAuthenticated(),
	})
})


//projectpage
server.get('/projects', isAuth, (req, res) => {
	res.render('projects.ejs',{
		isAuth: req.isAuthenticated(),
	})
})


//createprojectpage
server.get('/create', isAuth, (req, res) => {
	res.render('createproject.ejs',{
		isAuth: req.isAuthenticated(),
	})
})


//registerpage
server.get('/register', isNotAuth, (req, res) => {
	res.render('registerpage.ejs',{
		isAuth: req.isAuthenticated(),
	});
})

server.post('/register', async (req, res) => {
	let id = Date.now().toString();
	let firstname = req.body.firstname;
	let secondname = req.body.secondname;
	let username = req.body.username;
	const bcryptpassword = await bcrypt.hash(req.body.password, 10);
	let gender = req.body.rememberradiobox;
	let termsofservice = req.body.termsofservice;
	const user = userdata.find(user => user.username === username);

	if (!termsofservice) {
		return res.render("registerpage.ejs", {
			errorMessage: 'Sie müssen die Nutzungsbedingungen akzeptieren'
		});
	}
	else{
		try {
			if (user != null) {
				return res.render("registerpage.ejs", {
					errorMessage: 'Ein Nutzer mit diesem Usernamen existiert bereits'
				});
			}
			else {val_username = username}

			userdata.push({
				firstname: firstname,
				gender: gender,
				secondname: secondname,
				username: val_username,
				password: bcryptpassword,
				id: id,
			})

			fs.writeFileSync('./userdata.json', JSON.stringify(userdata, null, 2));

			console.log("Erfolgreich Account angelegt");
			console.log(userdata);
			//res.redirect('/preferences')
		} catch (error) {
			console.log(error)
			res.redirect('/register')
		}
	}
})


//lookup the current user for login inside json file and give out error message if password or username is wrong
async function validateLogin(username, password, done) {
	const user = userdata.find(user => user.username === username);
	if (user == null) {
		//if there is no such user display an error message (errotext is shown in registerpage.ejs)
		return done(null, false, {
			message: 'Dieser Nutzer existiert nicht'
		})
	}
	try {
		if (await bcrypt.compare(password, user.password)) {
			return done(null, user)
		} else {
			//if the password is wrong display an error message (errotext is shown in registerpage.ejs)
			return done(null, false, {
				message: 'Falches Passwort. Bitte versuche es erneut.'
			})
		}
	} catch (error) {
		return done(null, false, {
			message: 'Es ist ein unerwarteter Fehler aufgetreten. Versuche es später erneut'
		})
	}
}


//Inititalize Userlogin
//Umbedingt abändenr von der logik
function initialize() {
	var user = validateLogin
	passport.use(new LocalStrategy({ usernameField: 'username' }, user))
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => {
		return done(null, userdata.find(user => user.id === id))
	})
}


//checking if User is Authenticated
//used for the case that the user isn't authenticated yet and if so making him unable to visit pages
function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}


//used for the case that user is already authenticated for example making him unable to go back to the login page
function isNotAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}


//Logout
server.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/')
})
