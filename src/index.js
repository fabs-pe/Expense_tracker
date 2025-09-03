const { databaseConnect } = require('./database');

require('dotenv').config();

const PORT = process.env.PORT || 3005;

app.listen(PORT, async () => {
    await databaseConnect();
    console.log("Server Running!!")
});