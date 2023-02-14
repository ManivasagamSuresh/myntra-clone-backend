const express = require('express');
const router = express.Router();
const { verifyToken } = require('../verify');
const mongodb = require('mongodb');
const { DBconnect, closeConnection } = require('../dbConnect');


router.get('/filter/clothing/:clothing',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const products =await  db.collection("products").find({clothing:req.params.clothing}).toArray();
        await closeConnection();
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})


router.get('/filter/categories/:category',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const products =await  db.collection("products").find({category:req.params.category}).toArray();
        await closeConnection();
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})

router.get('/filter/genderprice/:clothing',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const products =await  db.collection("products").find({clothing:req.params.clothing,price:{$lt:1000}}).toArray();
        await closeConnection();
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router