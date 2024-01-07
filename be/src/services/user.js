const CustomError = require('../errors/CustomError');
const code = require('../errors/code');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs');
const { ONE_WEEK } = require('../constants');

const userDao = require('../daos/user');
const warningService = require('./warning');
const deviceService = require('./device');

const generateToken = (user) =>
  jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: ONE_WEEK });

const createUser = async ({ email, password, username, phoneNumber }) => {
  try {
    const hashedPassword = await userDao.hashedPassword({ password });

    const user = await userDao.createUser({
      email,
      password: hashedPassword,
      username,
      phoneNumber,
    });

    await warningService.createWarning({
      userId: user._id,
      embedId: '',
      history: [],
      typeWarning: 'email',
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const signIn = async ({ email, password }) => {
  const user = await userDao.findUserByEmail({ email });

  if (!user) throw new CustomError(code.UNAUTHORIZED, 'User not found');

  const isPasswordValid = user.comparePassword(password);

  if (!isPasswordValid)
    throw new CustomError(code.UNAUTHORIZED, 'Invalid password');

  const token = generateToken(user);

  return { user, token };
};

const getMe = async ({ userId }) => {
  try {
    const user = await userDao.findUserById({ id: userId });

    if (!user) throw new CustomError(code.UNAUTHORIZED, 'User not found');

    const userWarning = await warningService.getWarningByUserId({ userId });

    const userDevice = await deviceService.getDeviceByUserId({ userId });

    return {
      user,
      userWarning,
      userDevice,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async ({ userId }) => {
  try {
    const user = await userDao.findUserById({ id: userId });

    if (!user) throw new CustomError(code.UNAUTHORIZED, 'User not found');

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  signIn,
  getMe,
  getUserById,
};
