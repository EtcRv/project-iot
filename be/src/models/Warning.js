const mongoose = require('mongoose');

const WarningSchema = new mongoose.Schema(
  {
    userId: String,
    embedId: String,
    history: [
      {
        time: Date,
        value: Number,
        isTest: {
          type: Boolean,
          default: false,
        },
      },
    ],
    typeWarning: String,
  },
  {
    collection: 'warning',
    versionKey: false,
  },
);

module.exports = mongoose.model('Warning', WarningSchema);
