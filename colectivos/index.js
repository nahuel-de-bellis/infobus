const express = require("express");
const path = require("path");
const app = express();
var rou = require("./router/routers.js")(app);

app.use(express.static(path.join(__dirname, "/public")));
app.set("port", 3000);


app.listen(app.get("port"), ()=>{
    console.log("Corriendo Servidor");
});