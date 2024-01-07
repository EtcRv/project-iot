const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
  embedId: String,
  deviceName: String,
  connectState: {
    type: String,
    enum: ['ON', 'OFF'],
  },
  location: [],
  userId: String,
});

module.exports = mongoose.model('Device', DeviceSchema);
