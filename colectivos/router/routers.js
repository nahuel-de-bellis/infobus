const consultas = require("../config/consultas.js");
const request = require("request");
const bd = require("../database/bd.js");
const path = require("path")
const mongoClient = require("mongodb").MongoClient;

function validate(token, res){
    request('192.168.1.103:5000/validate/'+token, function(error, reponse, body){
        if(body){
            res.render("../public/index.html");        
        }
        else{
            request('192.168.1.103:3000/getoken');
        }

    });
}


module.exports = (app) =>{
    /*app.get("/", (req, res) =>{
        console.log(req.query.token);
        res.sendFile("../public/index.html");//validate(req.query.token, res);
    });*/

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
