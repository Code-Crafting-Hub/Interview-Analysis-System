const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    employeeName:String,
    dateOfJoining:String,
    month:String,
    pf:Number,
    basicSalary:{
        salary:{type:Number},
        bonus:{type:Number}
    },
    netSalary:Number,
    deduction:{
        pf: {type:Number},
        tds:{type:Number},
    }
},{timestamps:true})

const salaryModel = mongoose.model('salary',salarySchema)

module.exports = salaryModel