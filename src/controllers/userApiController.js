const db = require('../database/models');

module.exports = {
    detail: async (req,res) => {
        let response = {

        } 
        try {
            response.status = 200
            const user = await db.User.findByPk(req.params.id)
            user.password = undefined
            user.id_role = undefined
            response = {...user.dataValues, ...response}
            response.userImg = '/img/users/' + user.image
            return res.json(response)  
        } catch (error) {
            response.status = 403
            response.msg = error.msg
            return res.json(response)
        }

    },
    list: async (req,res) => {
        let response = {

        } 
        try {
            response.status = 200
            const listado = await db.User.findAll()
            response.count = listado.length
            response.users =listado.map((usuario) => {
                return {
                    id: usuario.id,
                    name: usuario.firstName,
                    email: usuario.email,
                    detail: '/api/users/' + usuario.id
                }
            })
            return res.json(response)  
        } catch (error) {
            response.status = 403
            response.msg = error.msg
            return res.json(response)
        }
    }
}