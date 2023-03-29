const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const authMiddleware = require('../middlewares/authMiddleware');
const multerValidator = require('../middlewares/multerMiddleware');

const productController = require('../controllers/productController');

router.get('/create', productController.add);
router.post('/create', multerValidator.single("image"), productController.create);

router.get('/productList', productController.list);
router.get('/productDetail/:id', productController.display);

router.get('/productEdit/:id', productController.edit);
router.put('/productUpdate/:id', productController.update);

router.get('/productDelete/:id', productController.delete);
router.post('/productDelete/:id', productController.destroy)


module.exports = router;
