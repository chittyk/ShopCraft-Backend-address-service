require('dotenv').config()
const express =require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const router = require('./src/routes/router')


const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.use('/api/address',router)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("address server is running at port ",PORT)
})