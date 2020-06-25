require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const isAuth = require("./middlewares/is-auth")

//start express app 
const app = express();

//database connectivity
require("./startup/db")();


//Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(isAuth);

//Setting up graphql 
require("./startup/graphql")(app);

//caughting uncaught exceptions
process.on('uncaughtException', (ex) => {
    throw err;
    process.exit(1);
})

//caughting unhandled rejections
process.on('unhandledRejection', (ex) => {
    throw err;
    process.exit(1);
})

//port
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})