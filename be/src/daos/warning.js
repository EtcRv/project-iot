const Warning = require('../models/Warning');

const createWarning = async ({ userId, history, typeWarning }) => {
  const warning = await Warning.create({
    userId,
    history,
    typeWarning,
  });

  return warning;
};

const findWarningById = async ({ id }) => {
  const warning = await Warning.findById(id);

  return warning;
};

const findWarningByUserId = async ({ userId }) => {
  const warning = await Warning.find({ userId: userId });

  return warning;
};

const findWarningByEmbedId = async ({ embedId }) => {
  const warning = await Warning.find({ embedId: embedId });

  return warning[0];
};

const updateWarning = async ({ userId, history, typeWarning }) => {
  const warningUpdated = await Warning.findOneAndUpdate(
    { userId: userId },
    {
      history: history,
      typeWarning: typeWarning,
    },
  );

  return warningUpdated;
};

module.exports = {
  createWarning,
  findWarningById,
  findWarningByUserId,
  updateWarning,
  findWarningByEmbedId,
};
