// Server Setup
// ---------------------------------------------------------------------------

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import router
var router = require('./app/routes/routes');

var port = process.env.PORT || 8080; // set our port

// Setup db
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_id'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Image model
var Image = require('./app/models/image');

// Register routes -------------------------------
app.use('/api', router);

// Start server
// ---------------------------------------------------------------------------
app.listen(port);
console.log('Starting server on port ' + port);
