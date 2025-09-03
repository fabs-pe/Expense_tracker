const mongoose = require('mongoose')

async function databaseConnect(){
    try{
        // DB connection 
        console.log("Connecting to:\n" + process.env.DB_URI);
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    } catch {
        console.warn(`databaseConnect failed to connect to DB:\n${JSON.stringify(error)}`);
    }
}

module.exports = {
    databaseConnect
}