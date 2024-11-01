const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

const app = express();
const port = 5000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => console.log(`Server is listening on Port ${port}..`));