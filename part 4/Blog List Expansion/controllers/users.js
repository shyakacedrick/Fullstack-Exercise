const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  })

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || username.length < 3) return res.status(400).json({ error: 'username too short' })
  if (!password || password.length < 3) return res.status(400).json({ error: 'password too short' })

  const existingUser = await User.findOne({ username })

  if (existingUser) return res.status(400).json({ error: 'username must be unique' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()

  res.status(201).json(savedUser)
})


module.exports = usersRouter