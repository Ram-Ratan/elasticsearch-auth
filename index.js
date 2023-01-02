const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
mongoose.set('strictQuery', true);


mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const indexroutes = require("./routes/indexRoutes");
const docroutes = require("./routes/docRoutes");
const adminroutes = require("./routes/adminRoutes");
app.use("/index", indexroutes);
app.use("/doc", docroutes);
app.use("/admin",adminroutes);


app.get('/', (req, res) => {
  res.send("home route");
});

app.listen(3000, () => {
  console.log("serving at port 3000");
});