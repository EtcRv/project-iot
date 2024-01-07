const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async ({ email, password, username, phoneNumber }) => {
  const existUser = await User.findOne({ email: email });

  if (existUser) throw new Error('User already exists');

  const user = await User.create({ email, password, username, phoneNumber });

  return user;
};

const findUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email: email });

  if (!user) throw new Error('User not found');

  return user;
};

const findUserById = async ({ id }) => {
  const user = await User.findById(id);

  return user;
};

const updateUser = async ({ email, password, username, phoneNumber }) => {
  const userUpdated = await User.findOneAndUpdate(
    { email: email },
    { password: password, username: username, phoneNumber: phoneNumber },
  );

  return userUpdated;
};

const hashedPassword = async ({ password }) => {
  const SALT_FACTOR = 10;

  return bcrypt.hashSync(password, SALT_FACTOR, null);
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  findUserById,
  hashedPassword,
};
