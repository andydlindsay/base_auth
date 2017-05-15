const express = require('express'),
      cors = require('cors'),
      config = require('config'),
      morgan = require('morgan'),
      path = require('path'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      bodyParser = require('body-parser');

// require dotenv to populate environment variables
require('dotenv').config();

// use bluebird for mongoose promises
mongoose.Promise = require('bluebird');

// create express app
const app = express();

// build db uri
let dbURI = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds143201.mlab.com:43201/base_auth';

// change database uri if testing
if (config.util.getEnv('NODE_ENV') == 'test') {
    dbURI = 'mongodb://localhost:27017/baseauthtest';
} else {
    // use morgan logger
    app.use(morgan('combined'));
}

// connect to the database
mongoose.connect(dbURI);

// on error
mongoose.connection.on('error', (err) => {
    console.info('Database error: ' + err);
});

// port number
const port = process.env.PORT;

// user route
const users = require('./routes/users');

// cors middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// passport configuration file
require('./config/passport')(passport);

// routes
app.use('/api/users', users);

// catchall route to redirect to client/index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// server start
app.listen(port, () => {
    console.info('Server listening on port %s\n', port);
});
