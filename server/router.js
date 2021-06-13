const express = require("express");
// const register = require("./register");
const User = require("./userSchema");
// const jwt = require('jsonwebtoken');
// const SECRETKEY = "hellomynameisarbajandiamasoftwaredeveloper";

const router = express.Router();


router.get("/",(req,res)=>{
    res.send("Hello from home router.");
})

router.get("/about",(req,res)=>{
    res.send("Hello from home router.");
})

// router.post("/register", (req,res)=>{
//     const {name,email,mobile,occupation,password,cpassword} = req.body;
//     if(!name || !email || !mobile || !occupation || !password || !cpassword){
//         console.log("Fields can not be empty");
//         return res.status(404).json({message:"empty field"});
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"email already exist"});
//         }
        
//         const user = new User({name,email,mobile,occupation,password,cpassword});
//         user.save()
//         .then(()=>{
//             res.status(200).json({message:"user vcreated successfully"});
//         })
//         .catch((err)=>{
//             res.status(500).json({error:"fail to register"});
//         })
//     }).catch((err)=>{
//         console.log(err);
//     })
        // console.log(req.body);
    // res.json({message:req.body});
    // res.send("Hello from register router.");
// })


//Using ayncn await
router.post("/register", async (req,res)=>{
    const {name,email,mobile,occupation,password,cpassword} = req.body;
    if(!name || !email || !mobile || !occupation || !password || !cpassword){
        console.log("Fields can not be empty");
        return res.status(400).json({message:"empty field"});
    }
    try{
        const userExist = await User.findOne({email:email})
            if(userExist){
                return res.status(400).json({message:"email already exist"});
            }
            else{
            const user = new User({name,email,mobile,occupation,password,cpassword});
            const userRegister = await user.save();
            if(userRegister){
                res.status(200).json({message:"user created successfully"});
            }
            else{
                res.status(400).json({message:"Failed to register user"});
            }
        }
    }catch(err){
            console.log(err);
    }

})

router.post("/signin", async (req,res)=>{
    try{
            const {email,password} = req.body;
            console.log(req.body);
            // console.log(email);
            // console.log(password);
            if(!email || !password){
                return res.status(400).json({message:"empty field"})
            }
            else{
                const userEmail = await User.findOne({email:email});
                console.log(userEmail);
                if(userEmail!=null){
                    if(password === userEmail.password){
                        // return res.status(200).json({message:"user login successful"});
                        const token = await userEmail.generateAuthToken();
                        console.log(token);
                        return res.status(200).json({message:"user login successful"});
                    }
                    else{
                        return res.status(400).json({message:"invalid credential"});
                    }
                }
                else{
                    return res.status(400).json({message:"User not registered"});
                }
            }
    }
    catch(err){
        console.log(err);
    }
})
router.get("/contact",(req,res)=>{
    res.send("Hello from home router.");
})


module.exports = router;