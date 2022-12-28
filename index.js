const express = require("express");

const bodyParser = require("body-parser");





// require("express-async-errors");

const app = express();
app.use(bodyParser.json());

const indexroutes = require("./routes/indexRoutes");
const docroutes = require("./routes/docRoutes");
app.use("/index",indexroutes);
app.use("/doc",docroutes);

// Express routes

app.get('/',(req,res)=>{
    res.send('home route');
})





app.listen(3000,()=>{
    console.log("serving at port 3000");
});