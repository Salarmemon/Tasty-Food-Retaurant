const express = require("express");
require("dotenv").config();
const app = express();
const menuRoute = require("./routes/menu");
const {authRoute} = require("./routes/auth");

const cors = require("cors");


app.use(express.json()); 
app.use(cors());

app.use("/auth", authRoute);

app.use(menuRoute);





app.listen(3000);