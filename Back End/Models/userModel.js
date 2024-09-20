const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: [4, 'Password must be at least 4 characters long']
    },
    image: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png'
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;