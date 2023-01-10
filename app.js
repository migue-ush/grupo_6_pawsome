const express = require('express');
const app = express();

const ejs = require('ejs');

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
});


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/user', (req, res) => {
    res.render('login')
});

app.get('/registro', (req, res) => {
    res.render('register')
});

app.get('/cart', (req, res) => {
    res.render('productCart')
});

app.get('/detalle', (req, res) => {
    res.render('productDetail')
});