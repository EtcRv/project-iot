const CustomError = require('../errors/CustomError');
const code = require('../errors/code');

const warningDao = require('../daos/warning');

const createWarning = async ({ userId, history, typeWarning }) => {
  try {
    const warning = await warningDao.createWarning({
      userId,
      history,
      typeWarning,
    });
    return warning;
  } catch (error) {
    throw new Error(error);
  }
};

const getWarningById = async ({ id }) => {
  try {
    const warning = await warningDao.findWarningById({ id });
    if (!warning) throw new CustomError(code.NOT_FOUND, 'Warning not found');
    return warning;
  } catch (error) {
    throw new Error(error);
  }
};

const getWarningByUserId = async ({ userId }) => {
  try {
    const warning = await warningDao.findWarningByUserId({ userId });
    if (!warning) throw new CustomError(code.NOT_FOUND, 'Warning not found');
    return warning;
  } catch (error) {
    throw new Error(error);
  }
};

const getWarningByEmbedId = async ({ embedId }) => {
  try {
    const warning = await warningDao.findWarningByEmbedId({ embedId });
    if (!warning) throw new CustomError(code.NOT_FOUND, 'Warning not found');
    return warning;
  } catch (error) {
    throw new Error(error);
  }
};

const updateWarning = async ({ userId, history, typeWarning }) => {
  try {
    const warning = await warningDao.findWarningByUserId({ userId });
    if (!warning) throw new CustomError(code.NOT_FOUND, 'Warning not found');
    warning.history = history;
    warning.typeWarning = typeWarning;
    const warningUpdated = await warning.save();
    return warningUpdated;
  } catch (error) {
    throw new Error(error);
  }
};

const addNewWarningHistory = async ({ embedId, newHistory }) => {
  try {
    const warning = await warningDao.findWarningByEmbedId({ embedId });
    if (!warning) throw new CustomError(code.NOT_FOUND, 'Warning not found');
    warning.history.push(newHistory);
    await warning.save();
    return warning;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createWarning,
  getWarningById,
  getWarningByUserId,
  updateWarning,
  addNewWarningHistory,
  getWarningByEmbedId,
};
