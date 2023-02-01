const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.list);

router.get('/productDetail/:id', productController.display);

router.get('/create', productController.create);

router.post('/create', productController.processCreate);

router.delete('/delete/:id', productController.delete);


module.exports = router;
