const controller =  {
    index: (req, res) => {
        res.render('index', {})
    },

    cart: (req, res) => {
        res.render('productCart')
    },

    about: (req, res) => {
        res.render('about')
    }
}

module.exports = controller

