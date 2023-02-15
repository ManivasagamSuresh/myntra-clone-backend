const express = require('express');
const { DBconnect, closeConnection } = require('../dbConnect');
const router = express.Router();
const bcrypt =  require('bcrypt');
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken');
const { verifyToken, verifyPutToken } = require('../verify');
const JWT_secret = process.env.JWT_secret

router.post('/signup',async(req,res)=>{
    try {
        const db = await DBconnect();
        var hash = await bcrypt.hash(req.body.password,10)
        // console.log(hash);
        req.body.password = hash;
        req.body.admin = 0;
        const user = db.collection("users").insertOne(req.body);
        await closeConnection();
        res.send("added")
    } catch (error) {
        console.log(error)
    }
})



router.post('/signin',async(req,res)=>{
    try {
        const db = await DBconnect();
         
        const user =await db.collection("users").findOne({email:req.body.email});
        const {password ,confirmpassword,...others} = user
        // console.log(user);
        // console.log(others);
        if(user){
            const compare = await bcrypt.compare(req.body.password,user.password);
            // console.log(compare);
            if(compare){
                const token = await jwt.sign({_id:user._id},JWT_secret,{expiresIn:"24h"})
                res.status(200).send({message:"success",others,token})
            }else{
                res.status(404).send("Incorrrect password / email")
            }
        }else{
            res.status(404).send("Incorrrect password / email")
        }
        await closeConnection();
        
    } catch (error) {
        console.log(error);
    }
})

router.get('/user/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const user =await db.collection("users").findOne({_id:mongodb.ObjectId(req.params.id)});
        await closeConnection();
        res.send(user);
    } catch (error) {
        console.log(error)
    }
})



router.put('/address/:id',verifyToken,async(req,res)=>{
    try {
        const db = await DBconnect();
        const user =await  db.collection("users").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:req.body});
        await closeConnection();
        res.send("updated");
    } catch (error) {
        console.log(error)
    }
})

router.put('/cartId/:id',verifyToken,async(req,res)=>{
    try {
        
        const db = await DBconnect();
        const user =await db.collection("users").updateOne({_id:mongodb.ObjectId(req.params.id)},{$addToSet:{cart:mongodb.ObjectId(req.body.pId)}});
        await closeConnection();
        res.send("updated");
    } catch (error) {
        console.log(error)
    }
})

router.put('/cartIdRemove/:id',verifyToken,async(req,res)=>{
    try {
        
        const db = await DBconnect();
        const user =await db.collection("users").updateOne({_id:mongodb.ObjectId(req.params.id)},{$pull:{cart:mongodb.ObjectId(req.body.pId)}});
        await closeConnection();
        res.send(user);
    } catch (error) {
        console.log(error)
    }
})

router.put('/wishId/:id',verifyToken,async(req,res)=>{
    try {
        
        const db = await DBconnect();
        const user = await db.collection("users").updateOne({_id:mongodb.ObjectId(req.params.id)},{$addToSet:{wishlist:mongodb.ObjectId(req.body.pId)}});
        await closeConnection();
        res.send("updated");
    } catch (error) {
        console.log(error)
    }
})
router.put('/wishIdRemove/:id',verifyToken,async(req,res)=>{
    try {
        
        const db = await DBconnect();
        const user = await db.collection("users").updateOne({_id:mongodb.ObjectId(req.params.id)},{$pull:{wishlist:mongodb.ObjectId(req.body.pId)}});
        await closeConnection();
        res.send(user);
    } catch (error) {
        console.log(error)
    }
})


module.exports = router