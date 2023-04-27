const { where } = require('sequelize');
const db = require('../database/models');//agregar los modelos de la db
const Product = require('../database/models/Product');
const sequelize = db.sequelize;


const productController = {
      add: async(req, res)=>{
        try {
            const categorias = await db.Category.findAll()
            const brand = await db.Brand.findAll()

            return res.render("products/create", {categorias: categorias, brand: brand})
            
        } catch (e) {
            console.log(e)
        }
    },

    create: async (req, res) => {
        try {
           const newProduct = await db.Product.create(
            {

                image: req.file.filename,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                id_category: req.body.id_category,//consultar como guardar
                id_brand: req.body.id_brand //
            }
            )
            res.redirect("productList")//ver el producto agregado en la lista
        }
        catch (e) {
            console.log(e)
        }
    },


    list: async (req, res) => {
        try{
            const product = await db.Product.findAll({include: [{association: 'Category' },{ association: 'brands' }]})
            return res.render("products/productList", { product: product});
            
        }
        catch (e) {
            console.log(e)
        }  

    },

    display: async (req, res) => {
        try{
            const product = await db.Product.findByPk(req.params.id, {include: [{association:'Category'}, {association:'brands'}]})
            const promCategorias = await db.Category.findAll();
            const brand = await db.Brand.findAll();
            res.render("products/productDetail", { product: product, categorias: promCategorias, brand: brand})
        }
        catch (e) {
            console.log(e)
        }      
      
    },

    edit: async (req, res) => {//traer las categorias 
        try {
            
            const product = await db.Product.findByPk(req.params.id,{include: [{association:'Category'}, {association:'brands'}]})
            const promCategorias = await db.Category.findAll();
            const brand = await db.Brand.findAll();
            res.render('products/productEdit', {Product: product , categorias : promCategorias, brand: brand})
            
        }
        catch (e) {
            console.log(e)
        }
    },

    update: async (req, res) => {
        try {
            await db.Product.update({   
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                id_category: req.body.id_category,
                id_brand: req.body.id_brand
            },{
                where:{
                    id: req.params.id
                }
            });
            res.redirect('/products/productList/');
        } catch (e) {
            console.error(e);
    
        }
    },


    delete: async (req, res) => {
        try {
            const producto = await db.Product.findByPk(req.params.id)
            res.render('/products/productDelete', { Product: producto })
        }

        catch (e) {
            console.log(e)
        }
    },

    destroy: async (req, res) => {
        try {
            const producto = await db.Product.destroy({ where: { id: req.params.id } })
            res.send(producto)
        }
        catch (e) {
            console.log(e)
        }
    }

};

module.exports = productController;