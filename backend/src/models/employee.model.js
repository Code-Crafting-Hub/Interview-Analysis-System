const mongoose = require('mongoose')

const employeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    phone:String,
    password:String,
    createrId:String,
    })

const employeModel = mongoose.model('employee', employeSchema)

module.exports = employeModel