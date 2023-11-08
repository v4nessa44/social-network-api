const express = require('express')
const User = require('../models/user')


const router = express.Router()

// Get All user
router.route('/').get(async (req, res) => {
  try {
    const users = await User.find()
    return res.send(users)
  }
  catch (err) {
    return res.send(err)
  }
})


// Get One user
router.route('/:id').get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('friends').populate('thoughts')
    return res.send(user)
  }
  catch (err) {
    return res.send(err)
  }
})

// Create a new user
router.route('/').post(async (req, res) => {
  // create a user
  try {
    const data = req.body
    const user = await User.create(data)
    return res.send(user)
  }
  catch (err) {
    return res.send(err)
  }
})

// update a user
router.route('/:id').put(async (req, res) => {
  try {

    const data = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true })
    return res.send(user)
  }
  catch (err) {
    return res.send(err)
  }

})

// delete a user
router.route('/:id').delete(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.send(user)
  }
  catch (err) {
    return res.send(err)
  }
})

// Add Friend
router.route('/:userId/friends/:friendId').post(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    user.friends.push(req.params.friendId)
    await user.save()
    return res.send(user)
  }
  catch (err) {
    return res.send(err)

  }
})


// Remove Friend
router.route('/:userId/friends/:friendId').delete(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId)
    user.friends.pull(req.params.friendId)
    await user.save()
    return res.send(user)
  }
  catch (err) {
    return res.send(err)

  }
})


module.exports = router