const express = require('express');
const userApiRoutes = express.Router();
const userApiController = require('../controllers/userApiController');

userApiRoutes.get('/', userApiController.list)
userApiRoutes.get('/:id', userApiController.detail)

module.exports = userApiRoutes