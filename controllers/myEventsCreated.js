var Event = require('../models/EventsModel');

module.exports = function(app) {
    
    // gets all event created by a user 
    app.post('/api/my/events', function(req, res) {
       Event.find({ created_by: req.body.user }, {name: 1, message: 1, created_by: 1}, function(err, myEvents){
           if (err) {
               return es.send(err);
           }
           return res.json(myEvents);
       });
    });

    // gets one event based on event id, needed for updating info
    app.post('/api/my/event', function(req, res ){

        var options = {name: 1, message: 1, open: 1, loc: 1 };
        Event.findById(req.body.id, options, function(err, event){
            if (err){
                return res.send(err);
            }
            if (!event) {
                return res.send(null);
            }
            return res.json(event);
        });
    });

}