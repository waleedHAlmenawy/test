const joi = require('joi');

const validateNewCourse = (course) =>{
    const schema = joi.object({
        courseName: joi.string().min(3).max(50).required(),
        description: joi.string().min(3).max(500),
        // createdOn: joi.date()
    });

    return schema.validate(course);
}

const validateUpdateCourse = (course) =>{
    const schema = joi.object({
        courseName: joi.string().min(3).max(50),
        description: joi.string().min(3).max(500),
        // createdOn: joi.date()
    });

    return schema.validate(course);
}

module.exports = {
    validateNewCourse,
    validateUpdateCourse
}