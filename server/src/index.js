const express = require("express");
require('dotenv').config();
const connectDb = require('../config/dataBase')
const routers = require('./routes/router')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())


connectDb();
app.use('/job',routers)
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`the server in running http://localhost:${port}`);
})