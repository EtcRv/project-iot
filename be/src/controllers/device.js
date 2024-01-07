const deviceService = require('../services/device');
const { logger } = require('../utils/logger');
const { handleReceiveMessage, handleSendMessage } = require('../utils/mqtt');

const createDevice = async (req, res) => {
  try {
    const { userId } = req.user;
    const { deviceName, deviceType, deviceStatus } = req.body;

    await deviceService.createDevice({
      userId,
      deviceName,
      deviceType,
      deviceStatus,
    });
    logger.info('Create device success');
    return res.send({
      status: 1,
    });
  } catch (error) {
    logger.error('Create device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const getDevice = async (req, res) => {
  try {
    const { userId } = req.user;
    const device = await deviceService.getDeviceByUserId({ userId });

    return res.send({
      status: 1,
      result: {
        device,
      },
    });
  } catch (error) {
    logger.error('Get device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const updateDevice = async (req, res) => {
  try {
    const { userId } = req.user;
    const { deviceName, deviceType, deviceStatus } = req.body;

    await deviceService.updateDevice({
      userId,
      deviceName,
      deviceType,
      deviceStatus,
    });
    logger.info('Update device success');
    return res.send({
      status: 1,
    });
  } catch (error) {
    logger.error('Update device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const testDevice = async (req, res) => {
  try {
    const { testType } = req.body;
    handleSendMessage(testType);

    return res.send({
      status: 1,
    });
  } catch (error) {
    logger.error('Test device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const getDeviceDetail = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await deviceService.getDeviceById({ id: deviceId });

    return res.send({
      status: 1,
      result: {
        device,
      },
    });
  } catch (error) {
    logger.error('Get device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

module.exports = {
  createDevice,
  getDevice,
  updateDevice,
  testDevice,
  getDeviceDetail,
};
