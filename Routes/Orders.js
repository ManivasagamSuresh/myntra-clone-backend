const express = require('express');
const { DBconnect, closeConnection } = require('../dbConnect');
const router = express.Router();
const { verifyToken } = require('../verify');
const mongodb = require('mongodb');

router.post('/addcart',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("cartitem").insertOne(req.body);
        await closeConnection();
        res.send("added")
    } catch (error) {
        console.log(error)
    }
})

router.get('/cart/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("cartitem").find({userId:req.params.id}).toArray();
        await closeConnection();
        res.send(product);
    } catch (error) {
        console.log(error)
    }
})


router.delete('/deletecart/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("cartitem").deleteOne({_id: mongodb.ObjectId(req.params.id)});
        await closeConnection();
        res.send("deleted")
    } catch (error) {
        console.log(error)
    }
})


router.post('/neworder',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("order").insertOne(req.body);
        await closeConnection();
        res.send("added")
    } catch (error) {
        console.log(error)
    }
})


router.delete('/deleteorder/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("order").deleteOne({_id: mongodb.ObjectId(req.params.id)});
        await closeConnection();
        res.send("deleted")
    } catch (error) {
        console.log(error)
    }
})



module.exports = router