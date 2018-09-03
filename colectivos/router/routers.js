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
    res.redirect("arduino.html");
});

    app.get("/getBus", (req, res) => {
        bd("transporte").then( (c) => {
            return new Promise((resuelve, error)=>{
                consultas.find(c, req, resuelve);
            });
            
        }).then((arr)=>{
            //let data = {"Lat": parseFloat(arr[0]['Lat']), "Lon": parseFloat(arr[0]['Long'])};
            console.log("arr ", arr);
            res.send(arr);
        });
    });
}
