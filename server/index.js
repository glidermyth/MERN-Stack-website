const express = require("express");

const app = express();

require("./dbconn");

app.use(express.json());

const user = require("./userSchema");

app.use(require("./router.js"));

// app.get("/",(req,res)=>{
//     res.send("Hello from home page.");
// })

// app.get("/about",(req,res)=>{
//     res.send("Hello from about page.");
// })

// app.get("/contact",(req,res)=>{
//     res.send("Hello from contact page.");
// })

// app.get("/login",(req,res)=>{
//     res.send("Hello from login page.");
// })

// app.get("/signup",(req,res)=>{
//     res.send("Hello from signup page.");
// })

app.listen(5000,()=>{
    console.log(`Listening to port 5000`);
})