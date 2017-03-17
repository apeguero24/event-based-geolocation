var Event = require('../models/EventsModel');

module.exports = function(app) {

    app.post('/api/peek/events', function(req, res) {
        var query = { name: { $regex: req.body.search, $options: 'i' } };
        var options = { name: 1, message: 1, loc: 1 };
        Event.find(query, options, function(err, event) {
            if (err) {
                return res.send(err);
            }
            return res.json(events);
        });
    });

}