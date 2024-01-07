const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const deviceController = require('../controllers/device');
const { auth } = require('../middlewares/auth');

router.post(
  '/device/create-device',
  auth,
  asyncMiddleware(deviceController.createDevice),
);
router.get(
  '/device/get-device',
  auth,
  asyncMiddleware(deviceController.getDevice),
);
router.put(
  '/device/update-device',
  auth,
  asyncMiddleware(deviceController.updateDevice),
);
router.post(
  '/device/test-device',
  auth,
  asyncMiddleware(deviceController.testDevice),
);
router.get(
  '/device/:deviceId',
  auth,
  asyncMiddleware(deviceController.getDeviceDetail),
);
module.exports = router;
