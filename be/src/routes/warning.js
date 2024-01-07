const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const warningController = require('../controllers/warning');
const { auth } = require('../middlewares/auth');

router.put(
  '/warning/update-warning',
  auth,
  asyncMiddleware(warningController.updateWarning),
);

router.get(
  '/warning/:embedId',
  auth,
  asyncMiddleware(warningController.getWarningByEmbedId),
);

module.exports = router;
