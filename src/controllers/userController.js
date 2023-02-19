const { validationResult } = require('express-validator')

const controller = {
    register: (req, res) => {
        return res.render('register');
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);
            if (userInDB){
                return res.render('userRegisterForm', {
                    errors: {
                        email: {
                            msg: 'Este email ya esá registrado'
                        }
                    },
                    oldData: req.body
                });
            }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            imagen: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/login');
    },

    login: (req,res) => {
        return res.render('login');
    },

    loginProcess: (req,res) => {
        let userToLogin = User.findByField('email', req.body.email);
        return res.send(userToLogin);
    },

    profile: (req,res) => {
        return res.render('userProfile')
    }
}

module.exports = controller;