const express = require('express');
const bodyParser = require('body-parser');
const routerWeb = require('./routes/web');
const mongoose = require('./database/mongoDb');
const passport = require('passport');
const app = express();

/**
 * Setting application
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());
app.use(passport.initialize());

require('./middleware/passport')(passport);

/**
 * Install routing
 */
app.use('/api/', routerWeb);

module.exports = app;
