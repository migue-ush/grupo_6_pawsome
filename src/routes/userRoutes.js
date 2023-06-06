const express = require('express');
const router = express.Router();


const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/userMiddleware')
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userMidddleware = require('../middlewares/userMiddleware')//para usar en create

// Formulario de Registro
router.get('/register', guestMiddleware, usersController.register);
// Procesar el registro
router.post('/register', uploadFile.single("avatar"), validations, usersController.processRegister);
// Formulario login
router.get('/login', guestMiddleware, usersController.login);
// Procesar login
router.post('/login', usersController.loginProcess);
// Perfil de ususario
router.get('/users', authMiddleware, usersController.profileList)
router.get('/userProfile/:id', usersController.profile);
router.get('/profile/', authMiddleware, usersController.profileUser);
//Edición de usuario
router.get('/edit/:id', authMiddleware, usersController.edit);
router.post('/edit/:id', usersController.update);
//Edición de usuario
router.get('/delete/:id', authMiddleware, usersController.delete);
router.post('/delete/:id', usersController.destroy);
// Logout
router.get('/logout/', usersController.logout);

module.exports = router;