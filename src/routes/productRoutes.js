const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const authMiddleware = require('../middlewares/authMiddleware');
const multerValidator = require('../middlewares/multerMiddleware');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img"))
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const uploadFile = multer({storage: multerDiskStorage});

const productController = require('../controllers/productController');

router.get('/create', productController.add);
router.post('/create', authMiddleware, multerValidator.single("image"), productController.create);

router.get('/productList', productController.list);
router.get('/productDetail/:id', productController.display);

router.get('/productEdit/:id', productController.edit);
router.put('/productEdit/:id', productController.update);

router.get('/productDelete/:id', productController.delete);
router.post('/productDelete/:id', productController.destroy)


module.exports = router;
