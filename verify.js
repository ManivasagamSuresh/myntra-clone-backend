const jwt = require('jsonwebtoken');
const JWT_secret = process.env.JWT_secret

const verifyToken = async(req,res,next)=>{
    try {
        const decodedToken = await jwt.verify(req.headers.authorization,JWT_secret,(err,user)=>{
            if(err){
                res.status(401).send("Unauthorised");
            }else{
                req.user = user;
                next()
            }
        });
            
    } catch (error) {
        res.status(401).send("Unauthorised");
    }
    
}

const verifyPutToken = async(req,res,next)=>{
    try {
        // console.log(req.body)
        let token = req.body.headers.Authorization;
        const decodedToken = await jwt.verify(token,JWT_secret,(err,user)=>{
            if(err){
                res.status(401).send("Unauthorised");
            }else{
                req.user = user;
                next()
            }
        });
            
    } catch (error) {
        res.status(401).send("Unauthorised");
    }
    
}



module.exports = {verifyToken,verifyPutToken};