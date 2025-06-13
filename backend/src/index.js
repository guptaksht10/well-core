import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";    

const app = express();
dotenv.config();

app.use(cors({
    origin: "*"
}));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));

// Error Handler 
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        status,
        message,
        success: false
    })
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(+(process.env.PORT), ()=>{
        console.log("http://localhost:" + process.env.PORT);
    })
}).catch((err)=>{
    console.log(err);
})