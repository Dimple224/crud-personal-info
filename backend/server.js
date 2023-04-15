const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require('path');

app.use(cors());
// app.use(require('cors')())

app.use(express.static(path.join(__dirname, './frontend/build')))

const userRouter = require("./routes/userRoute")

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
})

app.use(express.json());

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("connected successfully");
        app.listen(process.env.PORT || 8080, (err)=>{
            if(err) console.log(err);

            console.log("running successfully at", process.env.PORT);
        })
    }).catch((error) => {
        console.log("error", error);
    })

    app.use(userRouter)
