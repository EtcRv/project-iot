const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
require('dotenv').config();
const { logger } = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());

app.set('trust proxy', true);

require('./routes')(app);

const { PORT } = require('./configs');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
global.wss = wss;

wss.on('connection', (ws) => {
  ws.on('close', (code, reason) => {});
});

server.listen(PORT, () => {
  logger.info(`Listening on port: ${PORT}`);
});

require('./services/init');
