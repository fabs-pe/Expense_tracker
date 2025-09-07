const mongoose = require('mongoose')

async function databaseConnect(){
    try{
        // DB connection 
        console.log("Connecting to:\n" + process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch {
        console.warn(`databaseConnect failed to connect to DB:\n${JSON.stringify(error)}`);
    }
}

module.exports = {
    databaseConnect
}