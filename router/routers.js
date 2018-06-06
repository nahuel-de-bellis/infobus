const bd = require("../database/bd.js");

module.exports = (app) =>{
    

    app.get("/setBus", (req, res)=>{
        //query mongo almacena posicion 
	lat = req.query.Lat;
	lon = req.query.Lon;

    });

    app.get("/getBus", (req, res) => {
	//busca la posicion
	let lat = Math.floor(Math.random()*100);
	let lon = Math.floor(Math.random()*100);
        console.log(req.query.Lat, req.query.Long);
	//consulta mongo db
	let data = {"Lat": lat, "Lon": lon};
	let json = JSON.stringify(data);
        res.send(data);
    });

}

