const axios = require('axios');
const jwt = require('jsonwebtoken');
const { logger } = require('./logger');

const API_KEY = '2f905eb1-8155-47f2-83fe-cab7d6cf54dc';
const API_SECRET = '6duOTp9J';
const CAMPAIGN_ID = '659a25046e3b8b8b83e65844';
const URL = 'https://aicall.vbee.ai/api/v1/public-api/campaign';

const ACCESS_TOKEN = jwt.sign({ apiKey: API_KEY }, API_SECRET);
const makeCall = async (phoneNumber) => {
  try {
    const response = await axios({
      method: 'POST',
      url: URL,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      data: {
        campaign_id: CAMPAIGN_ID,
        contacts: [
          {
            phone_number: phoneNumber,
            danh_xung: 'Anh',
          },
        ],
      },
    });
    if (response.data.result === 1) logger.info('Make call success');
  } catch (error) {
    logger.error('Make call error');
  }
};

module.exports = { makeCall };
