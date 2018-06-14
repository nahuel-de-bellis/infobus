const consultas = require("../config/consultas.js"); 
const bd = require("../database/bd.js");
const mongoClient = require("mongodb").MongoClient;

module.exports = (app) =>{
    
    app.get("/setBus", (req, res) => {
        bd("transporte").then( (db)=>{
            return new Promise( (resuelve, error)=>{
                let c = db.collection("colectivos");
                let id = parseInt(req.query.idCol);
                let lat = parseInt(req.query.Lat);
                let lon = parseInt(req.query.Long);
                c.updateOne({id: id}, { $set:{ Lat: lat, Long: lon } }, function(err, result) {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Updated");
                        
                    }
                });

        });
        
    });
    
    res.send("OK");
});

    app.get("/getBus", (req, res) => {
    	
        let linea = req.query.Linea;
        bd("transporte").then( (db) => {
            return new Promise((resuelve, error)=>{
                let c = db.collection("colectivos");
                let id = parseInt(req.query.Id);
                c.find( { id: id } ).toArray(function(err, docs){
                    resuelve(docs);
                });

            });
            
        }).then((arr)=>{
            console.log(arr);
            let data = {"Lat": parseInt(arr[0]['Lat']), "Lon": parseInt(arr[0]['Long'])};
            console.log("data", data);
            res.send(data);
        });
    	/*let data = {"Lat": lat, "Lon": lon};
    	let json = JSON.stringify(arr);
        res.send(data);*/
    });
}
