class consultas{
	update(c, req){
		let id = parseInt(req.query.idCol);
        let lat = parseFloat(req.query.Lat);
        let lon = parseFloat(req.query.Long);
        lat /= 1000000; 
        lon /= 1000000;
        console.log(lat, lon);
		c.updateOne({id: id}, { $set:{ Lat: lat, Long: lon } }, function(err, result) {
            if(err){
                console.log(err);
            }
            else{
                console.log("Updated", id, lat, lon);
                        
            }
        });
	}

	find(c, req, resuelve){
	
		let l = parseInt(req.query.Linea);
        c.find( {linea: l } ).toArray(function(err, docs){
            resuelve(docs);
        });	
	}
}

module.exports = new consultas;