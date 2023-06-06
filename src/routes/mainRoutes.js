const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index)

router.get('/productCart', mainController.cart)

router.get('/about', mainController.about)


module.exports = router