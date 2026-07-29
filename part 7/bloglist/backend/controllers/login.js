const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid credentials' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET
  )

  res.status(200).send({ token, username: user.username })
})

module.exports = loginRouter