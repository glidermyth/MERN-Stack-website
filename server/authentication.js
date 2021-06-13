const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./userSchema");
const SECRETKEY = "hellomynameisarbajandiamasoftwaredeveloper";

const authentication = async (req,res,next) =>{
    // const token = req.cookies.jwt;
    try{
            const token = req.cookies.jwt;
            const verifyToken = jwt.verify(token,SECRETKEY);

            const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
            // console.log(rootUser);
            if(!rootUser){
                // return res.status(400).json({message:"Unauthorized User"});
                throw new Error("unauthorized");
            }
            else{
                req.token=token;
                req.rootUser = rootUser;
                req.userId = rootUser._id;
                // res.status(200).json({message:"User Found uccessfully"})
            }
            next();
    }
    catch(err){
        res.status(401).send("unauthorized");
        console.log(err);
    }
    
}


module.exports = authentication;