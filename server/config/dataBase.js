const mongoose = require('mongoose')
require('dotenv').config();

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            console.log('db is connect');
            
        })
    } catch (error) {
        console.log('db error ',error);
        
    }
}
module.exports = connectDb