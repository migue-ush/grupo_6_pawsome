const controller =  {
    index: (req, res) => {
        res.render('index', {})
    },
    register: (req, res) => {
        res.render('register')
    },
    login: (req, res) => {
        res.render('login')
    },
    cart: (req, res) => {
        res.render('productCart')
    },
    detail: (req, res) => {
        res.render('productDetail')
    },

    list: (req, res) => {
        res.render('productList')
    },

    about: (req, res) => {
        res.render('about')
    }
}

module.exports = controller

// app.get('/user', (req, res) => {
//     res.render('login')
// });

// app.get('/registro', (req, res) => {
//     res.render('register')
// });

// app.get('/cart', (req, res) => {
//     res.render('productCart')
// });

// app.get('/detalle', (req, res) => {
//     res.render('productDetail')
// });
