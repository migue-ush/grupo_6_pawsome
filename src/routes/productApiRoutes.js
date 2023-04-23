const express = require('express');
const productApiRoutes = express.Router();
const productApiController = require('../controllers/productApiController');

productApiRoutes.get('/', productApiController.list)
productApiRoutes.get('/:id', productApiController.detail)

module.exports = productApiRoutes;