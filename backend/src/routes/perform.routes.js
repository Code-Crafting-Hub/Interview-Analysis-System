const express = require('express')
const isAdmin = require('../middleware/isAdmin')
const { createPerform, getPerform, getOnePerform, deletePerform } = require('../controllers/performance.control')
const isEmployee = require('../middleware/isEmployee')

const performRouter = express.Router()

performRouter.post('/create/:employeeId', isAdmin, createPerform)
performRouter.get('/getall', isAdmin, getPerform)
performRouter.get('/getemp',isEmployee, getOnePerform)
performRouter.delete('/delete/:performId', isAdmin, deletePerform)

module.exports = performRouter