const mongoose = require('mongoose');

const db_connect = async () =>{
    mongoose.set('strictQuery', true);
    try {
         await mongoose.connect(process.env.MONGODB_URI);
         console.log('database connected successfuly')
        
    } catch (error) {
        console.log(error.message)
    }
   
}

module.exports = db_connect;