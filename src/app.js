const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes)



app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
});
