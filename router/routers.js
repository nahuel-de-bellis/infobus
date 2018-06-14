const consultas = require("../config/consultas.js"); 
const bd = require("../database/bd.js");
const mongoClient = require("mongodb").MongoClient;

module.exports = (app) =>{
    
    app.get("/setBus", (req, res) => {
        bd("transporte").then( (c)=>{
            return new Promise( (resuelve, error)=>{
                consultas.update(c, req);
        });
        
    }); 
    res.send("OK");
});

    app.get("/getBus", (req, res) => {
    	
        let linea = req.query.Linea;
        bd("transporte").then( (c) => {
            return new Promise((resuelve, error)=>{
                let context = this;
                consultas.find(c, req, resuelve);
            });
            
        }).then((arr)=>{
            console.log(arr);
            let data = {"Lat": parseInt(arr[0]['Lat']), "Lon": parseInt(arr[0]['Long'])};
            console.log("data", data);
            //let data = [];
            //arr.forEach( (value, index)=>{data[index] = {"Lat": parseInt(value['Lat']), "Lon": parseInt(value['Long'])};});
            console.log("data", data);
            res.send(data);
        });
    });
}
