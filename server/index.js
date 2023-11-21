const express = require("express");
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");

const cors = require('cors');
const chatRoute = require("./chat/chatRoute")();
const authRoute = require("./auth/authRoute")();
const messageRoute = require("./message/messageRoute")();
const userRoute = require("./user/userRoute")();

const config = require("dotenv").config;
config()

const app = express()

app.use(express.static('public'))
app.use('/images', express.static("images"))

app.use(bodyParser.json({limit:'30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB connected")
})
app.use(cors({origin:'*'}))
app.use('/user',userRoute)
app.use('/auth',authRoute)
app.use('/chat',chatRoute)
app.use('/message',messageRoute)

const server = require('http').createServer(app);
const socketConfig = require('./socketConfig');


const io = socketConfig(server);

const port = process.env.PORT || 8080;


server.listen(port,()=>{
    console.log(`Server started on Port ${port}`)
})