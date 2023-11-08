
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;


// reaction schema on thoughts
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: ObjectId,
        default: () => new ObjectId()
    },
    reactionbody: {
        type: String,
        require: true,
        maxlength: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})



//reaction schema created at field
reactionSchema.path('createdAt').get(function (timestamp) {
    return timestamp.toLocaleString();
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ]

})


//thoughts schema created at field
thoughtSchema.path('createdAt').get(function (timestamp) {
    return timestamp.toLocaleString();
});

module.exports = mongoose.model('Thoughts', thoughtSchema)