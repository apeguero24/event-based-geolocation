var Event = require('../models/EventsModel');
var moment = require('moment');

module.exports = function(app) {
        
    app.get('/api/create/events', function(req, res) {
        
        var places =  
            [
                {
                    name: 'Foo Club', 
                    type: 'Bar/Club',
                    created_by: '12345',
                    creation_date: moment(),
                    message: 'We are open!',
                    open: true,
                    loc:  [40.738959, -74.002372]
                },
                {
                    name: "Muse Club",
                    type: 'Bar/Club',
                    created_by: '123453',
                    creation_date: moment(),
                    message: 'We are open!',
                    open: true,
                    loc: [40.700745, -73.929567]
                },
                {
                    name: "Foo Bar",
                    type: 'Bar/Club',
                    created_by: '12345',
                    creation_date: moment(),
                    message: 'We are open!',
                    open: false,                    
                    loc: [40.700062, -73.927636]
                }
            ];
 

         Event.create(places, function(err, events) {
            if (err) {
                res.send(err);
            }
            res.json(events);
        });

    });
}