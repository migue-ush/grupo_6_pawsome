const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/create', productController.create)

router.post('/create', productController.processCreate)


module.exports = router