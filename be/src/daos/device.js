const Device = require('../models/Device');

const createDevice = async ({
  embedId,
  deviceName,
  connectState,
  location,
  userId,
}) => {
  const existDevice = await Device.findOne({ embedId: embedId });

  if (existDevice) throw new Error('Device already exists');

  const device = await Device.create({
    embedId,
    deviceName,
    connectState,
    location,
    userId,
  });

  return device;
};

const findDeviceById = async ({ id }) => {
  const device = await Device.findById(id);

  return device;
};

const findDeviceByUserId = async ({ userId }) => {
  const device = await Device.find({ userId: userId });

  return device;
};

const updateDevice = async ({
  embedId,
  deviceName,
  connectState,
  location,
  userId,
}) => {
  const newData = {};

  if (deviceName) newData['deviceName'] = deviceName;
  if (connectState) newData['connectState'] = connectState;
  if (location) newData['location'] = location;
  if (userId) newData['userId'] = userId;

  const deviceUpdated = await Device.findOneAndUpdate(
    { embedId: embedId },
    newData,
  );

  return deviceUpdated;
};

const findDeviceByEmbedId = async ({ embedId }) => {
  const device = await Device.find({ embedId: embedId });

  return device;
};

module.exports = {
  createDevice,
  findDeviceById,
  findDeviceByUserId,
  updateDevice,
  findDeviceByEmbedId,
};
