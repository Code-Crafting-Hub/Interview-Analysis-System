const express = require('express')
const isAdmin = require('../middleware/isAdmin')
const salaryController = require('../controllers/salary.control')
const isEmployee = require('../middleware/isEmployee')

const {createSalary, getAllSalary, getOneEmpSalary, deleteSalary} = salaryController

const salaryRouter = express.Router()

salaryRouter.post('/create/:employeeId', isAdmin, createSalary)
salaryRouter.post('/getall', isAdmin, getAllSalary)
salaryRouter.get('/getone', isEmployee, getOneEmpSalary)
salaryRouter.delete('/delete/:salaryId', isAdmin, deleteSalary)

module.exports = salaryRouter