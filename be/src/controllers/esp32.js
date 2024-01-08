const ESP32 = require('../models/Esp32');
const { logger } = require('../utils/logger');

const getTestEsp32 = async (req, res) => {
  try {
    const esp32 = await ESP32.findById('659b5f3af3d3c85e94bd3824');

    console.log(esp32);

    return res.send(esp32.testType);
  } catch (error) {
    logger.error('Get device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

const updateTestEsp32 = async (req, res) => {
  try {
    const { testType } = req.body;
    const currentTestType = await ESP32.findById('659b5f3af3d3c85e94bd3824');

    if (currentTestType === 'LOW') {
    }

    return res.send(testType);
  } catch (error) {
    logger.error('Get device error: ' + error.message);
    return res.send({ status: 0, message: error.message });
  }
};

module.exports = {
  getTestEsp32,
  updateTestEsp32,
};
