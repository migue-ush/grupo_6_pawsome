const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users')
    },

    filename: (req, file, cb) => {
        let fileName =  `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const uploadFile = multer({ storage });

const userController = require('../controllers/userController');

const validations = [
    body('firstName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribit un correo electrónico válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('categoria').notEmpty().withMessage('Tienes que seleccionar una categoria'),
];

router.get('/register', userController.register);
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

router.get('/login', userController.login);
router.post('/login', userController.loginProcess);
router.get('/profile/:userId', userController.profile);

module.exports = router;