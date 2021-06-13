const mongoose = require("mongoose");
const User = require("./userSchema");


const register = (req,res,next) =>{
        let name="arbaj",email="arbaj@gmail.com",mobile=9854762132;
        let occupation="student",password="arbaj",cpassword="arbaj";

        const arbaj= new User({
            name,email,mobile,occupation,pasword,cpassword
        });

        const result=arbaj.save();

        console.log(result);
        next();

}

module.exports = register;