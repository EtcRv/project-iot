const WebSocket = require('ws');

const sendSensorValueToClient = (ws, sensorValue) => {
  ws.send(
    JSON.stringify({
      type: 'sensorValue',
      payload: sensorValue,
    }),
  );
};

const sendSensorValueToAllClients = (sensorValue) => {
  global.wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      sendSensorValueToClient(client, sensorValue);
    }
  });
};

module.exports = {
  sendSensorValueToClient,
  sendSensorValueToAllClients,
};
