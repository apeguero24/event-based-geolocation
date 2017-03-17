var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: String, 
    type: String,
    created_by: String,
    message: String,
    open: Boolean,
    loc: { type: [Number], index: '2dsphere' }
}, { timestamps: true });

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;