const {Router} = require('express');
const Course = require('../models/course');
const addRouter = Router();

addRouter.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    });
});

addRouter.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
    });
    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }

});

module.exports = addRouter;
