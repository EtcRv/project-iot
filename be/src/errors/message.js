const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.DEMO_CALL_REACHED_TO_LIMIT:
      return 'Reached to limit of demo call';
    case codes.RECAPTCHA_INVALID:
      return 'Recaptcha invalid';
    case codes.HANG_UP_CALL_FAILED:
      return 'Hang up call failed';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
