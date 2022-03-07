if(process.env.NODE_ENV !== 'production') {
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
const bcrypt = require('bcrypt')

server.use("/css", express.static(path.join(__dirname, "css")));
server.use("/assets", express.static(path.join(__dirname, "assets")));
server.use("/pages", express.static(path.join(__dirname, "views")));
server.use("javascript", express.static(path.join(__dirname, "js")));

server.use(flash())
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}))
server.use(passport.initialize())
server.use(passport.session())
server.listen(3000)
server.use(express.urlencoded({extended: false}));
//saving users locally in json file (not production ready since one should use a server for that
//can be realized with MongoDB and mongoose package
const users = []

//call for initializing user
initialize();

//defining view engine for website
server.set('view-engine', 'ejs');


//root is index.ejs
server.get('/', (req, res) => {
	res.render('index.ejs',);
})

//loginpage 
server.get('/login', (req, res) => {
	res.render('loginpage.ejs');
})

server.post('/login', passport.authenticate('local', {
	successRedirect: '/preferences',
	failureRedirect: '/login',
	failureFlash: true
}))

//prefrencespage
server.get('/preferences', isAuth, (req, res) => {
	res.render('preferences.ejs');
})

//aboutuspage
server.get('aboutus', (req, res) => {
	res.render('aboutus.ejs')
})
  
//registerpage
server.get('/register', (req, res) => {
	res.render('registerpage.ejs');
})

server.post('/register', async (req, res) => {
	let id = Date.now().toString();
	let firstname = req.body.firstname;
	let secondname= req.body.secondname;
	let username = req.body.username;
	const bcryptpassword = await bcrypt.hash(req.body.password, 10);
	let gender = req.body.rememberradiobox;
	let termsofservice = req.body.termsofservice;

	try {
	  users.push({
		firstname: firstname,
		gender: gender,
		secondname: secondname,
		username: username,
		password: bcryptpassword,
		id: id,
	  })
	  console.log("Erfolgreich Account angelegt");
	  console.log(users);
	  res.redirect('/login')
	} catch(error) {
	  res.redirect('/register')
	}
  })

//Logout
server.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/login')
})

//check if account can be created and if everything looks fine
async function validateRegister(username, password, termsofservice, done){
	const user = users.find(user => user.username === username);
	if (!termsofservice){
		return done(null, false, {message: 'Sie müssen Nutzungsbedingungen akzeptieren'})
	}
	if (user != null) {
		return done(null, false, {message: 'That username does already exist'})
	}
	elif ()
}


//lookup the current user for login inside json file and give out error message if password or username is wrong
async function valdiateLogin(username, password, done){
	const user = users.find(user => user.username === username);
	if (user == null) {
		//if there is no such user display error message (errotext is shown in registerpage.ejs)
		return done(null, false, {message: 'Dieser Nutzer existiert nicht'})
	}
	try {
		if (await bcrypt.compare(password, user.password)) {
		return done(null, user)
		} else {
		//if the password is wrong display error message (errotext is shown in registerpage.ejs)
		return done(null, false, {message: 'Falches Passwort. Bitte versuche es erneut.'})
		}
	} catch (error) {
		return done(error)
	}
}

//Inititalize Userlogin
//Umbedingt abändenr von der logik
function initialize() {
	var user = valdiateLogin
	passport.use(new LocalStrategy({usernameField: 'username'}, user))
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => {
	return done(null, users.find(user => user.id === id))
	})
}


//checking if User is Authenticated

//used for the case that the user isn't authenticated yet and making him unable to visit pages which
//he isn't allowed to visit
function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
	  return next()
	}
	res.redirect('/login')
  }

//used for the case that user is already authenticated and making him unable to go back to the login page
function isNotAuth(req, res, next) {
if (req.isAuthenticated()) {
	return res.redirect('/')
}
next()
}