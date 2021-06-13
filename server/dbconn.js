const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://gliderMyth:arbaj786@cluster0.69szo.mongodb.net/mernData?retryWrites=true&w=majority",
                { useNewUrlParser: true , 
                useUnifiedTopology: true})
.then(()=>{
    console.log("Database connection successful");
})
.catch((err)=>{
    console.log(err);
})