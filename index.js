const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const cors = require('cors');
const mongoose = require('mongoose');

const password = `xDJgvfCbARdHDwDN`;
const url = `mongodb+srv://kudim:${password}@cluster0.vpgd6.mongodb.net/shop`;

const app = express();

app.use(cors());

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);


async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));

    } catch (e) {
        console.log(e);
    }
}

start();

const port = process.env.PORT || 3000;

