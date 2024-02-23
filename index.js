const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./route/AuthRoute");
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")

const db = require("./config/dbconfig");

const app = express();

/*MIDDLEWARE*/
app.use(express.json());
app.use(cookieParser()); //Helps you know a user's preference on your website
app.use(logger("dev")); //it helps to track user activities
app.use(express.urlencoded({ extended: false }));

//CORS POLICY
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

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
