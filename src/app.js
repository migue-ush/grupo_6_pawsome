const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(express.static('public'));
app.use
app.use(cors())
app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));


// Templates Engine
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// Rutas
const indexRoutes = require('./routes/mainRoutes');
app.use("/", indexRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes)

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes)

const productApiRoutes = require('./routes/productApiRoutes')
app.use('/api/products', productApiRoutes)

const userApiRoutes = require('./routes/userApiRoutes')
app.use('/api/users', userApiRoutes)
// Error 404 
/*app.use((req,res,next) => {
    res.status(404).render('not-found')
 });*/


app.listen(process.env.PORT || 3001, function() {
    console.log("Servidor corriendo");
});
