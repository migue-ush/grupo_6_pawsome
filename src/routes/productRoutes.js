const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const authMiddleware = require('../middlewares/authMiddleware');
const multerValidator = require('../middlewares/multerMiddleware');

const productController = require('../controllers/productController');

router.get('/create', authMiddleware, productController.add);
router.post('/create', multerValidator.single("image"), productController.create);

router.get('/productList', productController.list);
router.get('/productDetail/:id', productController.display);

router.get('/productEdit/:id', authMiddleware, productController.edit);
router.post('/productEdit/:id', productController.update);

router.get('/productDelete/:id', authMiddleware, productController.delete);
router.post('/productDelete/:id', productController.destroy)


module.exports = router;
