mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var imagesSchema = new Schema({
    eventId: String, 
    userId: String,
    imagePath: String, 
    likes: Number,
    likers: [String],
    note: String
}, { timestamps: true });

var Image = mongoose.model('Image', imagesSchema);

module.exports = Image; 