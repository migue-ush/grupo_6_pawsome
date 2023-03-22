const db = require('../database/models');//agregar los modelos de la db
const sequelize = db.sequelize;

//const path = require('path')
//const fs = require('fs');
//const productsJSON = path.join(__dirname,'../data/products.json');
//const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));


const productController = {
    add: (req, res) => {
         db.Category.findAll()
         .then(function(categorias){
            return res.render ("products/create", {categorias:categorias})
         })
        
    },
    
    create: async (req, res) => {
            try {
                const newProduct = await db.Product.create({
                    ...req.body
                })
                res.send(newProduct)
            }
            catch (e) {
                console.log(e)
            }
        },      
    

    list: (req, res) => {
        db.Product.findAll()
            .then(products =>{
                return res.render("products/productList", {products: products});
            })
        
    },

    display: (req, res) => {
        /*let product = products.find(row => row.id == req.params.id);
        if (product) return res.render("products/productDetail", {product: product});
        else return res.send("No se encontró el producto");
   */
        db.Product.findByPk(req.params.id)
            .then(product =>{
                res.render("products/productDetail", {product: product})
            })
    },

    edit: (req, res) => {
        let product = products.find(row => row.id == req.params.id)
        if (product) return res.render("products/productEdit", {product: product});
        else return res.send("No se encontró el producto")
    },

    update: (req, res) => {
        products.forEach(row => {
            if (row.id == req.params.id) {
                row.imagen = req.body.imagen
                row.nombre = req.body.nombre
                row.descripcion = req.body.descripcion
                row.categoria = req.body.categoria
                row.precio = req.body.precio  
            }
        })
        fs.writeFileSync(productsJSON, JSON.stringify(products, null, 2))
        return res.redirect('/products')
    },
        

    delete: async (req, res) => {
        try {
            const producto = await db.Product.findByPk(req.params.id)
            res.render('/products/productDelete', {Product: producto})
        }

        catch (e) {
            console.log(e)
        }
    },

    destroy: async (req, res) => {
        try{
            const producto = await db.Product.destroy({where: {id:req.params.id}})
            res.send(producto)
        }
        catch (e) {
            console.log(e)
        }
    }

};

module.exports = productController;