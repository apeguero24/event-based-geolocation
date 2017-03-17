var Event = require('../models/EventsModel');
var moment = require('moment');

module.exports = function(app) {

    // Updates the message body in the event
    app.post('/api/update/event', function(req, res){

            var message = req.body.message;

            var name = req.body.name;
            
            var open = req.body.open; //Boolean

            var long = req.body.loc[0] //longitude 
            var lat = req.body.loc[1] //latitude 

            var update = {
                name: name,
                message: message,
                open: open,
                loc: [ long, lat ], 
                updatedAt: moment()
            };

            Event.findByIdAndUpdate(req.body.id, update, function(err, updatedEvent) {
                if (err) {
                    return res.send(err);
                }
                return res.json(updatedEvent);
            });
        
    });
    
    // Deletes an event 
    app.delete('/api/delete/event', function(req, res) {

        Event.findByIdAndRemove(req.body.id, function(err, event) {
            if (err) {
                return res.send(err);
            }
            return res.send(true);
        });
    });
}