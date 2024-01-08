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
// const connectUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;
const connectUrl = `mqtts://${MQTT_HOST}:${MQTT_PORT}`;
const caCert = `-----BEGIN CERTIFICATE-----
MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB
CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97
nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt
43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P
T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4
gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO
BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR
TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw
DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr
hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg
06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF
PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls
YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk
CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=
-----END CERTIFICATE-----`;

const client = mqtt.connect(connectUrl, {
  clientId: `esp32-client-test-${Math.random().toString(16).substr(2, 8)}`,
  clean: true,
  connectTimeout: 10000,
  username: 'emqx',
  password: 'public',
  ca: caCert,
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
