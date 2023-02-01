const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

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

router.get('/', productController.list);

router.get('/productDetail/:id', productController.display);

router.get('/create', productController.create);

router.post('/create', uploadFile.single('imagen'), productController.processCreate);

router.delete('/delete/:id', productController.delete);


module.exports = router;
