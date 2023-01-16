const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');


app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', mainRoutes)

app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
});

// app.get('/', (req, res) => {
//     res.render('index')
// });

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
