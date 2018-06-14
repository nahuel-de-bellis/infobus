class consultas{
	update(c, req){
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
	}

	find(c, req, resuelve){
	
		let id = parseInt(req.query.Id);
        c.find( { id: id } ).toArray(function(err, docs){
            resuelve(docs);
        });	
	}
}

module.exports = new consultas;