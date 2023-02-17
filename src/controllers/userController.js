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
            imagen: req.file.filename
        }
    },

    login: (req,res) => {
        return res.render ('login');
    },

    profile: (req,res) => {
        return res.render('userProfile')
    }
}

module.exports = controller;