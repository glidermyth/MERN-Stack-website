const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const SECRETKEY = "hellomynameisarbajandiamasoftwaredeveloper";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    messages:[
        {
            message:String
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//generate auth token
userSchema.methods.generateAuthToken = async function(){
    try{
        let userToken = jwt.sign({_id:this._id},SECRETKEY);
        this.tokens = this.tokens.concat({token:userToken});
        await this.save();
        return userToken;
    }
    catch(err){
        console.log(err);
    }
}

userSchema.methods.contactDataPost = async function(message){
    try{
        this.messages = this.messages.concat({message});
        const result = await this.save();
        return(result);
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model("USER",userSchema);

module.exports = User;