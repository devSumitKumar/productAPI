require('dotenv').config();

const express = require("express");
const cors = require("cors");
//const cookieParser = require('cookie-parser');
const { connectionDB } = require("./connectiDB")
const userRouter = require("./route/signup")

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true})); //while accessing the cookies from the browser alway use specific origin and credentials: true
//app.use(cookieParser());

//DB connection
connectionDB().then(()=>{
    console.log("DB connected");
}).catch((err)=> console.log(`Failed to Connect: ${err}`))

app.use('/signup', userRouter)


//Port config
app.listen(process.env.PORT)