const path = require('path')
const fs = require('fs');
const productsJSON = path.join(__dirname,'../data/products.json');
const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));


const controller = {
    create: (req, res) => {
        return res.render ('products/create')
    },
    
    processCreate: (req, res) => {
        let id = products[products.length-1].id + 1
        let productoNuevo = {id, ...req.body}
        productoNuevo.imagen = req.file.filename
        products.push(productoNuevo)
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },

    list: (req, res) => {
        return res.render("products/productList", {products: products});
    },

    display: (req, res) => {
        let product = products.find(row => row.id == req.params.id);
        if (product) return res.render("products/productDetail", {product: product});
        else return res.send("No se encontró el producto");
    },

    edit: (req, res) => {
        let product = products.find(row => row.id == req.params.id)
        if (product) return res.render("products/productEdit", {product: product});
        else return res.send("No se encontró el producto")
    },

    update: (req, res) => {
        products.forEach(row => {
            if (row.id == req.params.id) {
                row.nombre = req.body.nombre
                row.precio = req.body.descripcion
                row.categoria = req.body.categoria
                row.categoria = req.body.precio
                row.categoria = req.body.imagen
            }
        })
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },
        

    delete: (req, res) => {
        let productFiltrados = products.filter(product => product.id != req.params.id);
        fs.writeFileSync(productsJSON, JSON.stringify(productFiltrados, null, 2))
        return res.render("products/productList", {products: productFiltrados})
    }

};

module.exports = controller;