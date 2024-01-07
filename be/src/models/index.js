const mongoose = require('mongoose');
const { MONGO_URI } = require('../configs');
const { logger } = require('../utils/logger');

mongoose.connect(MONGO_URI, { autoIndex: false });

mongoose.connection.on('error', (err) => {
  logger.error(`Connect error to MongoDB: ${MONGO_URI}`, {
    ctx: 'MongoDB',
    stack: err.stack,
  });
  process.exit();
});

mongoose.connection.once('open', () => {
  logger.info(`Connected to MongoDB: ${MONGO_URI}`, { ctx: 'MongoDB' });
});
