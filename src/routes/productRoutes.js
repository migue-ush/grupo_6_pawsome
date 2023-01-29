const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// app.get('/productList', productController.list);

// app.get('/productDetail/:id', productController.display);

router.get('/create', productController.create);


router.post('/create', productController.processCreate);


module.exports = router;