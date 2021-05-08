const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const cors = require('cors');
const mongoose = require('mongoose');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const User = require('./models/user');


const password = `xDJgvfCbARdHDwDN`;
const url = `mongodb+srv://kudim:${password}@cluster0.vpgd6.mongodb.net/shop`;

const app = express();

app.use(cors());


app.engine('hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
}));


app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
        req.user = await User.findById('6096c3e8d8296d3654db01f0');
        next();
    } catch (e) {
        console.log(e);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const port = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'dima@test.com',
                name: 'Dima',
                cart: {
                    item: []
                }
            });

            await user.save();
        }


        app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));

    } catch (e) {
        console.log(e);
    }
}

start();



