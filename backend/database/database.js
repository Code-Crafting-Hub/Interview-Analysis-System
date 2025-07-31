const mongoose = require('mongoose')
require('dotenv').config()

const dbUri = process.env.DBURI

const dbConnection = async()=>{
    try{
        await mongoose.connect(dbUri)
        console.log("database connected successfully")
    }catch(error){
        console.log("error while connecting database")
    }
}

module.exports = {dbConnection}