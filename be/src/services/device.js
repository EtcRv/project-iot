const CustomError = require('../errors/CustomError');
const code = require('../errors/code');

const deviceDao = require('../daos/device');

const createDevice = async ({
  embedId,
  deviceName,
  connectState,
  location,
  userId,
}) => {
  try {
    const device = await deviceDao.createDevice({
      embedId,
      deviceName,
      connectState,
      location,
      userId,
    });
    return device;
  } catch (error) {
    throw new Error(error);
  }
};

const getDeviceById = async ({ id }) => {
  try {
    const device = await deviceDao.findDeviceById({ id });
    if (!device) throw new CustomError(code.NOT_FOUND, 'Device not found');
    return device;
  } catch (error) {
    throw new Error(error);
  }
};

const getDeviceByUserId = async ({ userId }) => {
  try {
    const device = await deviceDao.findDeviceByUserId({ userId });
    if (!device) throw new CustomError(code.NOT_FOUND, 'Device not found');
    return device;
  } catch (error) {
    throw new Error(error);
  }
};

const getDeviceByEmbedId = async ({ embedId }) => {
  try {
    const device = await deviceDao.findDeviceByEmbedId({ embedId });
    if (!device) throw new CustomError(code.NOT_FOUND, 'Device not found');
    return device;
  } catch (error) {
    throw new Error(error);
  }
};

const updateDevice = async ({
  embedId,
  deviceName,
  connectState,
  location,
  userId,
}) => {
  try {
    const deviceUpdated = await deviceDao.updateDevice({
      embedId,
      deviceName,
      connectState,
      location,
      userId,
    });
    return deviceUpdated;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createDevice,
  getDeviceById,
  getDeviceByUserId,
  updateDevice,
  getDeviceByEmbedId,
};
