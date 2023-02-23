const { validationResult } = require('express-validator')

const controller = {
    // users: (req, res) => {
    //     res.render('users')
    // },
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

        return res.redirect('/users/login');
    },

    login: (req,res) => {
        return res.render('login');
    },

    loginProcess: (req,res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
        if(userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect('/user/profile');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                }
            });
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },
    
    profile: (req,res) => {
        return res.render('userProfile', {
            user: req.session.userLogged
        });
    }
}

module.exports = controller;