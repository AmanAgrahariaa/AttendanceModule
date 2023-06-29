const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: String,
  startDate: Date,
  endDate: Date
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
