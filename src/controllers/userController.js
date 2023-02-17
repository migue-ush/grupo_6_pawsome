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

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            imagen: req.file.filename
        }

        User.create(userToCreate)
    },

    login: (req,res) => {
        return res.render ('login');
    },

    profile: (req,res) => {
        return res.render('userProfile')
    }
}

module.exports = controller;