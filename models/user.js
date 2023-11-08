const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Use a regular expression to validate the email format
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    friends: [{
        type: ObjectId,
        ref: 'User'
    }],
    thoughts: [
        {
            type: ObjectId,
            ref: 'Thoughts'
        }
    ]

})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = mongoose.model('User', userSchema)