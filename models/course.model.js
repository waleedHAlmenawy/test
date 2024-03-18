const mongoose = require('mongoose');

const couresSchema = mongoose.Schema({
    courseName: {
        type: String,
        minLength: 3,
        maxLength: 512,
        required: true 
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 512,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Coures = mongoose.model('Course', couresSchema);

module.exports = Coures;