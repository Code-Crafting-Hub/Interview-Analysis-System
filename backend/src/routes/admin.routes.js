const express = require('express')
const adminControl = require('../controllers/admin.control')
const adminRoute = express.Router()

const {signup, login,logout} = adminControl

adminRoute.post('/signup', signup)
adminRoute.post('/login', login)
adminRoute.post('/logout', logout)

module.exports = adminRoute