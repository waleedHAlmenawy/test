const {v4:uuid} = require('uuid');
const {validateNewCourse, validateUpdateCourse} = require('../validation/course.validator');
const Coures = require('../models/course.model');

var courses = [
    {
        id: 1,
        name: "Node JS"
    },
    {
        id: 2,
        name: "Angular"
    },
    {
        id: 3,
        name: "Express"
    },
]

const rootMsg = (req, res) => {
    res.send("Hello From Express JS");
}

const getAllCourse = async (req, res) => {
    res.render('index', {title: 'Courses', courses: await Coures.find()});
}

const getCoursesById = async (req, res) => {
    
    const course = await Coures.findOne({_id: req.params.id});

    if (!course) {
        res.status(404).send("The course with id: " + req.params.id + " not exists")
    } else {
        res.send(course);
    }
}

const createCourse = async (req, res) => {
    // id: uuid(),
    const {error, value} = validateNewCourse(req.body);

    if(error) {
        res.status(400).send({message: "Error happened while updating"});
        return;
    }

    const course = await Coures.create(value);
    res.send(course);
}

const updateCourse = async (req, res) => {
    const course = await Coures.findOne({_id: req.params.id});

    if (!course) {
        res.status(404).send("The course with id: " + req.params.id + " not exists");
        return;
    }

    const {error, value} = validateUpdateCourse(req.body);

    if(error) {
        res.status(400).send({message: "Error happened while updating"});
        return;
    }

    await Coures.updateOne({_id: req.params.id}, {$set: {courseName: req.body.courseName}});

    res.send(await Coures.findOne({_id: req.params.id}));
}

const deleteCourse = async (req, res) => {
    const course = await Coures.findOne({_id: req.params.id});

    if (!course) {
        res.status(404).send("The course with id: " + req.params.id + " not exists");
        return;
    }

    await Coures.deleteOne({_id: req.params.id});
    res.send(course);
}

module.exports = {
    courses,
    rootMsg,
    getAllCourse,
    getCoursesById,
    createCourse,
    updateCourse,
    deleteCourse
}