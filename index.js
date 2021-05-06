const express = require('express');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cors = require('cors');

const app = express()

app.use(cors());

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});





app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));