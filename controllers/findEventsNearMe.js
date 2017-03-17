var moment = require('moment');
var Event = require('../models/EventsModel');

module.exports = function(app) {

    app.post('/api/findEventsNearMe', function(req, res){

        var query = {
            open: true,
            loc: {
                $near : {
                        $geometry: { type: "Point",  coordinates: [ -73.928022, 40.701152 ] },
                        $maxDistance: 8000 //max distance in meters 
                    }
                }
            };
        var options =  { name: 1, type: 1, message: 1, created_by: 1, loc: 1 };
        
        Event.find(query, options,  function(err, events) {
            if (err) { 
                return res.send(err);
            }
            if (!events){
                // no events near
                return res.send(null);
            }
            return res.json(events);
        })

    });

}
