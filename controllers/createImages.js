var Image = require('../models/ImagesModel');
var moment = require('moment');

// Image samples 
snaps = [
    {
        eventId: '57c0ef9e9fbb1d9c0414c5f7',
        userId: '12ejhf1231hj431h',
        imagePath: '/images/image.png',
        likes: 0,
        likers: [],
        note: 'A picture with my friends at '
    },
    {
        eventId: '57c0ef9e9fbb1d9c0414c5f7',
        userId: '12ejhf1231hj431h',        
        imagePath: '/images/image.png',
        likes: 0,
        likers: [],
        note: 'A picture with my buddy Mike '
    },
    {
        eventId: '57c0ef9e9fbb1d9c0414c5f7',
        userId: '12ejhf1231hj431h',        
        imagePath: '/images/image.png',
        likes: 0,
        likers: [],
        note: 'Two girls making out! This place is lit!'
    }        

];

module.exports = function(app) {

    app.post('/api/create/images', function(req, res) {
        Image.create(snaps, function(err, snaps){
            if (err) {
                return res.send(err);
            }
            return res.json(snaps);
        });
    });
    
}