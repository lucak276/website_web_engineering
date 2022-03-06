if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

//requirements
const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/pages", express.static(path.join(__dirname, "views")));
app.use("javascript", express.static(path.join(__dirname, "js")));
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.listen(3000)
app.use(express.urlencoded({extended: false}));
const users = []

//defining view engine for website
app.set('view-engine', 'ejs');


//root is index.ejs
app.get('/', (req, res) => {
	res.render('index.ejs',);
})

//loginpage 
app.get('/login', (req, res) => {
	res.render('loginpage.ejs');
})

app.post('/login', passport.authenticate('local', {
	successRedirect: '/preferences',
	failureRedirect: '/login',
	failureFlash: true
}))

//prefrencespage
app.get('/preferences', checkAuthenticated, (req, res) => {
	res.render('preferences.ejs');
})
  
//registerpage
app.get('/register', (req, res) => {
	res.render('registerpage.ejs');
})

app.post('/register', async (req, res) => {
	try {
	  const hashedPassword = await bcrypt.hash(req.body.password, 10)
	  users.push({
		firstname: req.body.firstname,
		secondname: req.body.secondname,
		username: req.body.username,
		password: hashedPassword,
		id: Date.now().toString(),
	  })
	  console.log("Erfolgreich Account angelegt");
	  res.redirect('/login')
	} catch(error) {
	  res.redirect('/register')
	}
  })

//LogOut
app.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/login')
})

initialize(
	username => users.find(user => user.username === username),
	id => users.find(user => user.id === id)
)

//Inititalize Userlogin
//Umbedingt abändenr von der logik
function initialize(getUserByUsername, getUserById) {
	const authenticateUser = async (username, password, done) => {
	  const user = getUserByUsername(username)
	  if (user == null) {
		//if there is no such user display error message (errotext is shown in registerpage.ejs)
		return done(null, false, { message: 'That user does not exist yet' })
	  }
	  try {
		if (await bcrypt.compare(password, user.password)) {
		  return done(null, user)
		} else {
		//if the password is wrong display error message (errotext is shown in registerpage.ejs)
		  return done(null, false, { message: 'Password incorrect, please try again.' })
		}
	  } catch (error) {
		return done(error)
	  }
	}
  
	passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => {
	  return done(null, getUserById(id))
	})
  }

//checkAuthenticated

//used for the case that the user isn't authenticated yet and making him unable to visit pages which
//he isn't allowed to visit
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return next()
	}
	res.redirect('/login')
  }
  //used for the case that user is already authenticated and making him unable to go back to the login page
  function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return res.redirect('/')
	}
	next()
  }