const express = require('express')
const app = express();

// configure API DAta recieving and sending
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// welcome route
app.get ("/", (request,response)=>{
    response.json({
        message: "Expense Tracker"
    })
})

// 404 route
app.get("*", (request, response) =>{
    response.status(404).json({
        message: "No route with that path!"
    });
});

module.exports={
    app
}