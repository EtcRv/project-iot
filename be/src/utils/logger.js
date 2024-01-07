const winston = require('winston');

const logFormat = winston.format.combine(
  winston.format.printf((info) => {
    const { level, message, ...rest } = info;
    const formattedMessage = `${info.level}: ${info.message}`;
    return winston.format.colorize().colorize(level, formattedMessage);
  }),
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [new winston.transports.Console()],
});

module.exports = { logger };
