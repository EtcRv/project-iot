const jwt = require('jsonwebtoken');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const { JWT_SECRET } = require('../configs');

const verifyAccessToken = async (accessToken) => {
  try {
    let data = jwt.verify(accessToken, JWT_SECRET);
    const { _id: userId } = data;

    if (!userId) throw new CustomError(errorCodes.UNAUTHORIZED);

    return data;
  } catch (error) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }
};

module.exports = {
  verifyAccessToken,
};
