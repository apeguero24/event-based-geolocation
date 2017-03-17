var Image = require('../models/ImagesModel');
var _ = require('underscore');

module.exports = function(app) {

    app.post('/api/likedOrNot', function(req, res) {
        
        var myUser = req.body.userId;

        Image.findById(req.body.id, function(err, snap) {
            if (err) {
                return res.send(err);
            }
            var found = _.find(snap.likers, function(userId) {
                return userId === myUser; 
            });

            if (found !== myUser) {
                // if the user has not liked the image then push userId and increment by 1 
                var options = { $push: { likers: myUser }, $inc: { likes: 1 } };
                Image.findByIdAndUpdate(req.body.id, options, function(err) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.send(true);
                });
            } else {
                // else pull the user from likers array and decrement by 1
                var options = { $pull: { likers: myUser }, $inc: { likes: -1 }};
                Image.findByIdAndUpdate(req.body.id, options, function(err) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.send(false);
                });              
            }
        });
    });
}