const express = require('express');
const mongodb = require("mongodb");
const { DBconnect, closeConnection } = require('../dbConnect');
const { verifyToken } = require('../verify');
const router = express.Router();


router.post('/addproduct',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("products").insertOne(req.body);
        await closeConnection();
        res.send("added")
    } catch (error) {
        console.log(error)
    }
})

router.get('/products',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const products =await  db.collection("products").find({}).toArray();
        await closeConnection();
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})

router.get('/product/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("products").findOne({_id: mongodb.ObjectId(req.params.id)});
        await closeConnection();
        res.send(product)
    } catch (error) {
        console.log(error)
    }
})


router.put('/updateproduct/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        
        const product =await db.collection("products").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
        await closeConnection();
        res.send(product)
    } catch (error) {
        console.log(error)
    }
})


router.delete('/deleteproduct/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("products").deleteOne({_id:mongodb.ObjectId(req.params.id)});
        await closeConnection();
        res.send("deleted")
    } catch (error) {
        console.log(error)
    }
})

router.post('/wishlist',verifyToken,async(req,res)=>{
    try {
        
        const db = await DBconnect();
        const product =await db.collection("wishlist").insertOne(req.body);
        await closeConnection();
        res.send("added")
    } catch (error) {
        console.log(error)
    }
})

router.get('/wishlist/:id',verifyToken,async(req,res)=>{
    try {
        // console.log(req.user);
        const db = await DBconnect();
        const product =await db.collection("wishlist").find({userId:req.params.id}).toArray();
        await closeConnection();
        res.send(product);
    } catch (error) {
        console.log(error)
    }
})


router.delete('/wishlistdelete/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const product =await db.collection("wishlist").deleteOne({_id: mongodb.ObjectId(req.params.id)});
        await closeConnection();
        res.send("deleted")
    } catch (error) {
        console.log(error)
    }
})



module.exports = router