const bd = require("../database/bd.js");

module.exports = (app) =>{

    app.get("/setBus", (req, res)=>{
        

    });

    app.get("/getBus", (req, res) => {
        console.log(req.query.t);
        res.send("Recibido");

    });

}