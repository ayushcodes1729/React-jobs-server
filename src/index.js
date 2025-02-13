const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "https://react-jobs-steel.vercel.app", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed HTTP methods
    credentials: true, // If using cookies or authentication headers
  })
);
app.use(express.json());

const jobRouter = require("./routes/job");

app.use("/", jobRouter);
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
