const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const authService = require('../services/auth');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(errorCodes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') throw new Error(errorCodes.UNAUTHORIZED);

  const data = await authService.verifyAccessToken(accessToken);
  const { _id: userId, email, username } = data;

  req.user = { userId, email, username };

  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
};
