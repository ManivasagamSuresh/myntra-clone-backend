const mongodb = require("mongodb");
const env = require("dotenv").config();
const mongoURL = process.env.URL;


let db ;
let connection;

const mongoclient = new mongodb.MongoClient(mongoURL);

async function DBconnect(){
    try {
        const connection =await mongoclient.connect();
        const db = connection.db("e-commerce");
        return db;

    } catch (error) {
        console.log(error)
    }
}

const closeConnection = async()=>{
    if(connection){
        await connection.close();
    }
}

module.exports = {DBconnect,db,connection,closeConnection};