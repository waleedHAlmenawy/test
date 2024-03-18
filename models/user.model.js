const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 15,
        minLength: 3
    },
    encryptedPass: {
        type: String,
        required: true,
        maxLength: 250,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 15,
        minLength: 3
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;