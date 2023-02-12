const express  = require("express");
const mongodb = require("mongodb");
const env = require("dotenv").config();
const cors = require('cors');
const filter = require('./Routes/Filters');
const orders = require('./Routes/Orders');
const products = require('./Routes/Products');
const users = require('./Routes/User');


const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use('/api',filter);
app.use('/api',products);
app.use('/api',orders);
app.use('/api',users);




app.listen( process.env.PORT || 5000,()=>{
    console.log("connected")
});