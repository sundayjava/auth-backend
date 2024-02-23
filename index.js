const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./route/AuthRoute");
const cors = require("cors")

const db = require("./config/dbconfig");

const app = express();

/*MIDDLEWARE*/
app.use(express.json());
app.use(cookieParser()); //Helps you know a user's preference on your website
app.use(logger("dev")); //it helps to track user activities
app.use(express.urlencoded({ extended: false }));

//CORS POLICY
// const allowedOrigins = ['http://localhost:5173', 'https://codivesky-group-1.vercel.app',"/*"];
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Default route
app.get("/", (req, res) => {
  res.send("Hello, this is the default route!");
});

//Routes
app.use("/auth", AuthRoute);

/*PORT*/
const PORT = process.env.PORT || 8086;

/*DB CONNECT*/
db();

/*CREAT SERVER*/
app.listen(PORT, () => console.log(`Server run on port: ${PORT}`));
