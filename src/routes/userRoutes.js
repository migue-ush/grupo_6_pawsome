const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/register', userController.register);
router.post('/register', userController.register);

router.get('/login', userController.login);
router.get('/profile/:userId', userController.profile);

module.exports = router;