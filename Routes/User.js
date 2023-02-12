const express = require('express');
const { DBconnect, closeConnection } = require('../dbConnect');
const router = express.Router();
const bcrypt =  require('bcrypt');
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken');
const JWT_secret = process.env.JWT_secret

router.post('/signup',async(req,res)=>{
    try {
        const db = await DBconnect();
        var hash = await bcrypt.hash(req.body.password,10)
        // console.log(hash);
        req.body.password = hash;
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
        // console.log(user);
        if(user){
            const compare = await bcrypt.compare(req.body.password,user.password);
            // console.log(compare);
            if(compare){
                const token = await jwt.sign({_id:user._id},JWT_secret,{expiresIn:"24h"})
                res.status(200).send({message:"success",token})
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

module.exports = router