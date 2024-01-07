const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const userController = require('../controllers/user');
const { auth } = require('../middlewares/auth');

// Authentication
router.post('/auth/sign-up', asyncMiddleware(userController.signUp));
router.post('/auth/sign-in', asyncMiddleware(userController.signIn));
router.get('/auth/me', auth, asyncMiddleware(userController.getMe));
module.exports = router;
