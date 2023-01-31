const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// const mainRoutes = require('./routes/mainRoutes');
// app.use('/', mainRoutes)
const indexRoutes = require('./routes/mainRoutes');
app.use("/",indexRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes)

app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
});
