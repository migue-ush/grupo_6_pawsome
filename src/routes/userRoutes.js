const express = require('express');
const router = express.Router();


const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware')
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userMidddleware = require('../middlewares/userMiddleware')//para usar en create


// router.get('/', usersController.users);
// router.get('/users', usersController.register);

// Formulario de Registro
router.get('/register', guestMiddleware,usersController.register);
// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);
// Formulario login
router.get('/login', usersController.login);
// Procesar login
// router.post('/login', usersController.loginProcess);
// Perfil de ususario
// router.get('/profile', usersController.profile);
// Logout
// router.get('/logout/', usersController.logout);

module.exports = router;