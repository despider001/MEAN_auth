const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// bring all the routers
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter  = require('./routes/auth');


// env variables
require('dotenv').config();

// connect to database
require('./config/mongodb');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// require passport-jwt config
require('./config/passport')(passport);

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.all('*', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

module.exports = app;
