
require('dotenv').config();

const app = require('./src/ap');
const connectDB = require('./src/db/db');

connectDB();


app.listen(3000,()=>{
    console.log("Server is Running On 3000 Port");
})