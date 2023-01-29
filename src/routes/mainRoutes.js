const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index)

router.get('/register', mainController.register)

router.get('/login', mainController.login)

router.get('/productCart', mainController.cart)

// router.get('/productDetail', mainController.detail)

// router.get('/productList', mainController.list)

router.get('/about', mainController.about)



module.exports = router