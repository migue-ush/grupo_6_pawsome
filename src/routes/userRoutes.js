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

const usersController = require('../controllers/userController');

const validations = [
    body('firstName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribit un correo electrónico válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('categoria').notEmpty().withMessage('Tienes que seleccionar una categoria'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];
router.get('/', usersController.users);
router.get('/users/register', usersController.register);
router.post('/users/register', uploadFile.single('avatar'), validations, usersController.processRegister);

router.get('/users/login', usersController.login);
router.post('/users/login', usersController.loginProcess);
router.get('/profile/:userId', usersController.profile);

module.exports = router;