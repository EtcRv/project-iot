const warningService = require('../services/warning');
const { logger } = require('../utils/logger');

const updateWarning = async (req, res) => {
  try {
    const { userId } = req.user;
    const { history, typeWarning } = req.body;

    await warningService.updateWarning({
      userId,
      history,
      typeWarning,
    });
    logger.info('Update warning success');
    return res.send({
      status: 1,
    });
  } catch (error) {
    logger.error('Update warning error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const getWarningByEmbedId = async (req, res) => {
  try {
    const { embedId } = req.params;
    const warning = await warningService.getWarningByEmbedId({ embedId });
    logger.info('Get warning success');
    return res.send({
      status: 1,
      warning,
    });
  } catch (error) {
    logger.error('Get warning error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

module.exports = {
  updateWarning,
  getWarningByEmbedId,
};
