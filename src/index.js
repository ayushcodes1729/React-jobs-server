const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())

const jobRouter = require('./routes/job')

app.use('/', jobRouter);
// app.get('/',(req,res)=>{
//     console.log("Hello World");
//     res.send("Hello World")
// })

connectDB()
    .then(() => {
        console.log("Database Connection established...");
        app.listen(PORT, () => {
            console.log("Server listening successfully on port", PORT + "...");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected");
    });