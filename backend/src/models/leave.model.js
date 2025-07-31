const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    startDate: {
        type:String,
        required:true
    },
    endDate: {
        type:String,
        required:true
    },
    purpose: {
        type:String,
        required:true
    },
    employeeId:String,
    leavetype:{
        type:String,
        required:true
    },
    approval:{
        type:Boolean,
        required:true
    }
})

const leaveModel = mongoose.model('leave',leaveSchema)

module.exports = leaveModel