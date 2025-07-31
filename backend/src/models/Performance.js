const mongoose = require('mongoose')

const performanceSchema = new mongoose.Schema({
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true
    },
    reviewPeriod:{
        type:String,
        required:true
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    feedback:{
        type:String
    },
}, {timestamps:true})

const perfromModel = mongoose.model('performance',performanceSchema)

module.exports = perfromModel