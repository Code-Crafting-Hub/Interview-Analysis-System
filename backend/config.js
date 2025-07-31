require('dotenv').config()

const JWT_ADMIN_PASSWORD = process.env.ADMINJWT
const JWT_USER_PASSWORD = process.env.USERJWT

const config = {JWT_ADMIN_PASSWORD,JWT_USER_PASSWORD}

module.exports = config