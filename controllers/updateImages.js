var Image = require('../models/ImagesModel');
var moment = require('moment');

module.exports = function(app) {
    
    app.post('/api/update/image', function(req, res) {
        var update = {
            note: req.body.note,
            updatedAt: moment()
        }
        Image.findByIdAndUpdate(req.body.id, update, function(err, snap){
            if (err) {
                return res.send(err);
            }
            if (!snap) {
                return res.send(null);
            }
            // updated successfully
            return res.send(true);
        });
    });

    app.post('/api/checkIfMyImage', function(req, res) {
        // for testing purposes 
        var user = '12ejhf1231hj431h';

        // finds and checks if the image is owned by the user 
        Image.findById(req.body.id, function(err, snap) {
            if (err) {
                return res.send(err);
            }
            if (!snap) {
                return res.send(null);
            }
            // if the user is the owner of the image send authorization 
            if (snap.userId === user) {
                return res.send(true);
            } else {
                return res.send(false);
            }
        });
    });

    app.delete('/api/delete/image', function(req, res) {
        Image.findByIdAndRemove(req.body.id, function(err, image){
            if (err) {
                return res.send(err);
            } 
            if (!image) {
                return res.send(null);
            }
            // deleted successfully
            return res.send(true);
        });
    });
}