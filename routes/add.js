const {Router} = require('express');
const Course = require('../models/course');
const addRouter = Router();

addRouter.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    });
});

addRouter.post('/', async(req, res) => {
    console.log(req.body);
    const course = new Course(req.body.title, req.body.price, req.body.img);
    await course.save();

    res.redirect('/courses');
});

module.exports = addRouter;