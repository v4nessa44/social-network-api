const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const Thoughts = require('../models/thought')
const User = require('../models/user')

const router = express.Router()


//Get All Thoughts
router.route('/').get(async (req, res) => {
    try {

        const thoughts = await Thoughts.find()
        return res.send(thoughts)
    }
    catch (err) {
        return res.send(err)
    }
})

// get One Thought
router.route('/:id').get(async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id)
        return res.send(thought)

    }
    catch (err) {
        return res.send(err)
    }
})

// Create a New Thought
router.route('/').post(async (req, res) => {
    try {
        //1. create thought
        const data = req.body;
        const thought = await Thoughts.create(data)

        //2. push thought id into user
        const user = await User.findById(req.body.userId)
        user.thoughts.push(thought._id); // Push the thought's _id into the user's thoughts array
        await user.save(); // Save the updated user document


        res.send(thought)
    }
    catch (err) {
        res.send(err)
    }
})

// Update a Thought
router.route('/:id').put(async (req, res) => {
    try {
        const data = req.body
        const thought = await Thoughts.findByIdAndUpdate(req.params.id, data)
        return res.send(thought)
    }
    catch (err) {
        return res.send(err)
    }
})

// Delete a Thought
router.route('/:id').delete(async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndDelete(req.params.id)
        return res.send(thought)
    }
    catch (err) {
        return res.send(err)
    }
})


// add a reaction
router.route('/:thoughtId/reactions').post(async (req, res) => {

    try {
        const thought = await Thoughts.findById(req.params.thoughtId);
        console.log(thought);
        const newReaction = {
            reactionId: mongoose.Types.ObjectId(), // Use mongoose.Types.ObjectId() to create a new ObjectId
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            createdAt: new Date(), // Use the current timestamp
        };

        console.log(newReaction);

        thought.reactions.push(newReaction);


        await thought.save()
        return res.send(thought)
    }
    catch (err) {
        res.send(err)
    }
})

// remove a reaction

router.route('/:thoughtId/reactions').delete(async (req, res) => {

    try {
        const thought = await Thoughts.findById(req.params.thoughtId);
        console.log(thought);
        const newReaction = {
            reactionId: mongoose.Types.ObjectId(), // Use mongoose.Types.ObjectId() to create a new ObjectId
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            createdAt: new Date(), // Use the current timestamp
        };

        console.log(newReaction);

        thought.reactions.push(newReaction);


        await thought.save()
        return res.send(thought)
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router