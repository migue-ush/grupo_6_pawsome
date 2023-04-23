const db = require('../database/models');

module.exports = {
    detail: async (req,res) => {
        let response = {
        } 
        try {
            response.status = 200
            const product = await db.Product.findByPk(req.params.id, {include: [{association: 'Category'}, {association: 'brands'}]})
            response = {...product.dataValues, ...response}
            response.productImg = '/img/' + product.image
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
            const list = await db.Product.findAll({include: [{association: 'Category'}]})
            const categories = await db.Category.findAll({include: [{association: 'products'}]})
            response.count = list.length
            response.countByCategory = {}
            categories.forEach(category => {
                response.countByCategory[category.name] = category.products.length
            });
            response.products =list.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    detail: '/api/products/' + product.id,
                    category: product.category
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