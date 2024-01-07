const mqtt = require('mqtt');
const { logger } = require('../utils/logger');
const { MQTT_HOST, MQTT_PORT, MQTT_TOPIC } = require('../configs');
const deviceService = require('../services/device');
const warningService = require('../services/warning');
const userService = require('../services/user');
const { THRESHOLD_NO_GAS, THRESHOLD_LEAK_HIGH } = require('../constants');
const {
  sendSensorValueToClient,
  sendSensorValueToAllClients,
} = require('./websocket');
const { makeCall } = require('./makeCall');
const connectUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;
const client = mqtt.connect(connectUrl, {
  clientId: 'mqtt-subscriber',
  clean: true,
  connectTimeout: 4000,
});
client.on('connect', () => {
  logger.info('Connected to MQTT broker');
  client.subscribe(MQTT_TOPIC, (err) => {
    if (err) {
      logger.error('Subscription error:', err);
    } else {
      logger.info(`Subscribed to topic '${MQTT_TOPIC}'`);
    }
  });
});
client.on('message', (receivedTopic, message) => {
  handleReceiveMessage(message);
});
client.on('error', (err) => {
  logger.error('MQTT error:', err);
});
client.on('close', () => {
  logger.info('Connection to MQTT broker closed');
});

const handleSendMessage = async (message) => {
  client.publish(MQTT_TOPIC, JSON.stringify(message), (err) => {
    if (err) {
      logger.error('Publishing error:', err);
    } else {
      logger.info('Message published successfully');
    }
  });
};

const handleReceiveMessage = async (message) => {
  const convertMessage = JSON.parse(message.toString());

  if (convertMessage?.status) {
    logger.info('Receive result of check device alive');
    const { devideId: embedId, status } = convertMessage;
    const connectState = status == 'Alive' ? 'ON' : 'OFF';
    const device = await deviceService.getDeviceByEmbedId({ embedId });
    if (!device.length)
      await deviceService.createDevice({
        embedId,
        deviceName: 'New Device',
        location: [],
        connectState,
        userId: '',
      });
    else await deviceService.updateDevice({ embedId, connectState });
  } else if (convertMessage?.message) {
    const { devideId: embedId, value } = convertMessage;
    if (value >= THRESHOLD_NO_GAS) {
      const newHistory = {
        time: new Date(),
        value,
        isTest: convertMessage?.test === 'true' ? true : false,
      };
      await warningService.addNewWarningHistory({ embedId, newHistory });
      if (value >= THRESHOLD_LEAK_HIGH) {
        const device = await deviceService.getDeviceByEmbedId({ embedId });
        if (device.length) {
          const { userId } = device[0];
          const userInfo = await userService.getUserById({ userId });
          if (userInfo) {
            makeCall(userInfo.phoneNumber);
          }
        }
      }
    }
    sendSensorValueToAllClients(value);
  }
};

module.exports = {
  handleSendMessage,
  handleReceiveMessage,
};
