const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
    }
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;