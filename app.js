var bodyParser = require('body-parser');

// Controllers 
var findEventsNearMe = require('./controllers/findEventsNearMe');
var createEvents = require('./controllers/createEvents');
var getEventImages = require('./controllers/getEventImages');
var createImages = require('./controllers/createImages');
var updateEvents = require('./controllers/updateEvents');
var myEventsCreated = require('./controllers/myEventsCreated');
var peekAtEvents = require('./controllers/peekAtEvents');
var updateImages = require('./controllers/updateImages');
var likeImages = require('./controllers/likeImages');

// DB config.js object 
var config = require('./config');

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000; 

// Gets rid of deprecated promise msg 
mongoose.Promise = global.Promise;   

// Middleware for parsing data  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to db 
mongoose.connect(config.getDbConnectionString());

// Finds all near events given a location
findEventsNearMe(app);

// Sets dummy events to test queries 
createEvents(app);

// Find images for an event 
getEventImages(app);

// Creates dummy images for now
createImages(app);

// updates an event's open status 
updateEvents(app);

// Brings the user created events
myEventsCreated(app);

// Search for an event and peek at it 
peekAtEvents(app);

// Update images 
updateImages(app);

// checks if user liked the image and increments or decrements 
likeImages(app);

app.listen(port);

