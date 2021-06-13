const express = require("express");
const User = require('./userSchema');
const authentication = require("./authentication");
const cookieParser = require("cookie-parser");

const app = express();

require('./dbconn');

app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello From Home page");
})

app.get("/aboutData",authentication,(req,res) =>{

    res.send(req.rootUser);

})

app.get("/signout",(req,res) =>{

    let data = res.clearCookie("jwt",{path:"/"});
    // console.log(data);
    if(data){
        res.status(200).send();
    }
    else{
        return res.status(400);
    }
})

app.get("/contactData",authentication,(req,res) =>{

    res.send(req.rootUser);

})

app.post("/contactDataPost", async (req,res)=>{
    const {email,message} = req.body;
    if(!email || !message){
        return res.status(400).json({message:"fields cannot be empty"});
    }
    else{
        const userExist = await User.findOne({email});
        if(userExist){
            let dataPost = userExist.contactDataPost(message);
            if(dataPost){
                return res.status(200).json({message:"message sent successfully"});
            }
            else{
                return res.status(200).json({message:"message sent failed"});
            }
        }
        else{
            return res.status(400).json({message:"user not registered"});
        }
    }
})

app.post("/register", async (req,res)=>{
        // res.json({message:"connection Successful"});
        try{
            const {name,email,mobile,occupation,password,cpassword} = req.body;
            if(!name || !email || !mobile || !occupation || !password || !cpassword){
                console.log("Fields cannot be empty");
                return res.status(400).json({message:"Fields cannot be empty"});
            }
            else{
                const userExist = await User.findOne({email:email});
                if(userExist){
                    console.log("User already exist,Please Register");
                    return res.status(401).json({message:"User already exist,Please Login"})
                }
                else{
                    const user = new User({name,email,mobile,occupation,password,cpassword})
                    const registerUser = await user.save();
                    if(registerUser){
                        console.log("user registered successfully");
                        res.status(200).json({message:"user registered successfully"});
                    }
                    else{
                        console.log("user registration failed");
                        res.status(400).json({message:"user registration failed"});
                    }
                }
            }
        }
        catch(err){
            console.log(err);
        }
})

app.post("/signin", async (req,res) =>{
        try{
                const {email,password} = req.body;
                // console.log(req.body);
                if(!email || !password){
                    return res.status(400).json({message:"fields cannot be empty"});
                }
                else{
                    const user = await User.findOne({email});
                    // console.log(user);
                    if(user){
                        if(user.password === password){
                            console.log("User Login Successfull");
                            // console.log(user);
                            let token = await user.generateAuthToken();
                            // console.log(token);
                            res.cookie("jwt",token);
                            return res.status(200).json({message:"User login successful"});
                        }
                        else{
                            return res.status(200).json({message:"invalid credentials"});
                        }
                    }
                    else{
                        return res.status(400).json({message:"user not registered"});
                    }
                }
        }
        catch(err){

        }
})


app.listen(5000,()=>{
    console.log("connection successful.");
    console.log("listening to port: 5000");
})