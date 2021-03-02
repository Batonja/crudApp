const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const app = express();
const route = require("./server/routes/router");
const connectDB = require("./server/database/connection");
const bodyParser = require("body-parser");

//Reads from config.env and the port will be 3000 as in config.env
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(morgan("tiny"));

//mongodb connection
connectDB();

app.use(route);
//body parse
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//app.set("views",path.resolve(__dirname, "views/ejs")); if you change path to the views which is by default ./views

app.use("/css", express.static(path.resolve(__dirname, "assets/css"))); //virtual path
app.use("/img", express.static(path.resolve(__dirname, "assets/img"))); //virtual path
app.use("/js", express.static(path.resolve(__dirname, "assets/js"))); //virtual path

app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
