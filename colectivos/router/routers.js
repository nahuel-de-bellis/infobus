const consultas = require("../config/consultas.js");
const request = require("request");
const bd = require("../database/bd.js");
const path = require("path")
const mongoClient = require("mongodb").MongoClient;

function validate(token, res){
    request('http://192.168.1.103:5000/validate/'+token, {json: true}, function(error, reponse, body){
        if(reponse.statusCode === 404) {
            res.sendStatus(404);
            return console.log(error)
        }
        else{
            res.sendFile(path.join(__dirname, "../public/index.html"));
        }

    });
}


module.exports = (app) =>{
    app.get("/", (req, res)=>{
        res.redirect("192.168.1.103:3000/especial");
    });
    app.get("/especial", (req, res) =>{
        console.log(req.query.token);
        validate(req.query.token, res);
    });

    app.get("/setBus", (req, res) => {
        bd("transporte").then( (c)=>{
            return new Promise( (resuelve, error)=>{
                consultas.update(c, req);
        });
        
    });
    res.sendFile(path.join(__dirname, "../public/arduino.html"));
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
