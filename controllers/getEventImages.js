var Image = require('../models/ImagesModel');
var Event = require('../models/EventsModel');
var moment = require('moment');

// havesine formula module 
var haversine = require('haversine');

module.exports = function(app) {
    
    // gets all images (snaps) posted to an event sort by date
    app.post('/api/sort/date/images', function(req, res) {

       var options = { imagePath: 1, note: 1, eventId: 1, creation_date: 1, likes: 1 };
       Image.find({ eventId: req.body.id }, options, function(err, snaps){
           if (err) {
               return res.send(err);
           }
           if (!snaps) {
               // no snaps found 
               return res.send(null);
           }
           return res.json(snaps);
       }).sort({ creation_date: 'desc' });
    });

    // gets all images (snaps) posted to an event sort by popularity (likes)
    app.post('/api/sort/likes/images', function(req, res) {

       var options = { imagePath: 1, note: 1, eventId: 1, likes: 1, creation_date: 1};
       Image.find({ eventId: req.body.id }, options, function(err, snaps){
           if (err) {
               return res.send(err);
           }
           if (!snaps) {
               // no snaps found 
               return res.send(null);
           }
           return res.json(snaps);
       }).sort({ likes: 'desc' });
    });    

    // confirms if a user is within the posting range 
    app.post('/api/confirm/if/near', function (req, res) {
        
        //fake location
        myLoc = { latitude: req.body.lat, longitude: req.body.long };

        Event.findById(req.body.id, { loc: 1 }, function(err, event) {
            if (err) {
                return res.send(err);
            }
            if (!event) {
                // no event found
                return res.send(null);
            }

            // Location 
            var location = { latitude: event.loc[1], longitude: event.loc[0] };

            // Distance between my location and the event with a threshold of 0.25 km 
            var allow = haversine(myLoc, location, { threshold: 0.25 });

            return res.send(allow);
        });
    });

    // brings the snaps that user has taken that are max 3 days old 
    app.post('/api/my/images', function(req, res) {

        var query = {
            userId: req.body.user,
            creation_date: { $lte: moment(), $gt: moment().subtract(3, 'days') }
        };
        var options = { eventId: 1, imagePath: 1, note: 1 };

        Image.find(query, options, function(err, result) {
            if (err) {
                return res.send(err);
            }
            if (!result) {
                // no images found
                return res.send(null);
            }
            return res.json(result);
        });
    });
}

