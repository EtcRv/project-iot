const userService = require('../services/user');
const { logger } = require('../utils/logger');

const signUp = async (req, res) => {
  try {
    const { email, password, username, phoneNumber } = req.body;

    await userService.createUser({ email, password, username, phoneNumber });
    logger.info('Create user success');
    return res.send({
      status: 1,
    });
  } catch (error) {
    logger.error('Create user error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.signIn({ email, password });
    logger.info('Sign in success: ' + user);

    return res.send({
      status: 1,
      result: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        token,
      },
    });
  } catch (error) {
    logger.error('Sign in error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const { userId } = req.user;
    const userInfomation = await userService.getMe({ userId });

    return res.send({
      status: 1,
      result: {
        user: userInfomation,
      },
    });
  } catch (error) {
    logger.error('Get me error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  getMe,
};
