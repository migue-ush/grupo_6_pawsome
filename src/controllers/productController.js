const productsJSON = require('../data/products.json');
const fs = require('fs');

const controller = {
    create: (req, res) => {
        return res.render ('products/create')
    },
    
    processCreate: (req, res) => {
        let id = products[products.length-1].id + 1
        let productoNuevo = {id, ...req.body}
        products.push(productoNuevo)
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    }
}

module.exports = controller