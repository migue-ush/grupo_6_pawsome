const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;

const User = require('../database/models/User');

const controller = {
    register: (req, res) => {
        return res.render('users/register');
    },

    processRegister: async (req, res) => {

        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        try {
            const userInDB = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya esá registrado'
                    }
                },
                oldData: req.body
            });
        }
        
            const newUser = await db.User.create(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    image: req.file.filename, //avatar
                    id_role: req.body.id_role
                })
            res.redirect('/users/login')
        }
        catch (e) {
            console.log(e)
        }

    },
    
    profileList: async (req, res) => {
        const users = await db.User.findAll({
            order: [['lastName', 'ASC']]
        })
        res.render('users/users', { users: users })
    },

    /* processRegister: (req, res) => {
        const resultValidation = validationResult(req);

       if (resultValidation.errors.length > 0) {
             return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
         }*/

    //     let userInDB = User.findByField('email', req.body.email);
    //         if (userInDB){
    //             return res.render('users/register', {
    //                 errors: {
    //                     email: {
    //                         msg: 'Este email ya esá registrado'
    //                     }
    //                 },
    //                 oldData: req.body
    //             });
    //         }

    //     let userToCreate = {
    //         ...req.body,
    //         password: bcryptjs.hashSync(req.body.password, 10),
    //         imagen: req.file.filename
    //     }

    login: (req, res) => {
        console.log(req.session);
        return res.render('users/login');
    },

    loginProcess: async (req, res) => {
        try{
        let userToLogin = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                /*console.log(req.params.id)*/
                return res.redirect('/users/profile');
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'No se encuentra este email en nuestra base de datos'
                    }
                }
            });
        } catch (error) {
            console.log(error);
    }
    },

    profileUser: (req, res) => {
		return res.render('users/profile', {
            user: req.session.userLogged
			
		});
    },

    profile: async (req, res) => {
        const user = await db.User.findByPk(req.params.id, { include: [{ association: "role" }] })
        const role = await db.Role.findAll()
        return res.render('users/userProfile', { user, role })

    },

    edit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, { include: [{ association: "role" }] })
            const role = await db.Role.findAll()
            res.render('users/userEdit', { user, role })
        }
        catch (e) {
            console.log(e)
        }

    },

    update: async (req, res) => {
        try {
            const user = await db.User.update({ ...req.body },
                { where: { id: req.params.id } })
            /*console.log(user)
            if (user == 0) throw new Error('Hubo un error al Actualizar')*/
            res.redirect('/users/userProfile/' + req.params.id)
        }
        catch (e) {
            console.log(e)
            res.send(e.message)
        }
    },

    delete: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id)
            res.render('users/userDelete', { user })
        }
        catch (e) {
            console.log(e)
        }
    },

    destroy: async (req, res) => {
        const user = await db.User.destroy({ where: { id: req.params.id } })
        res.redirect('/users/users')
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controller;