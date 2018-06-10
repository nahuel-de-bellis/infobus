class consultas{


	update(colection, req, call){
		let id = parseInt(req.query.idCol);
		let lat = req.query.Lat;
		let lon = req.query.Long;
		console.log(id, lat, lon);
		colection.updateOne({id: id}, { $set:{ Lat: lat, Long: lon } }, function(err, result) {
		    if(err){
		    	console.log(err);
		    }

		    else{
		    	console.log("Updated");
		    	
			}

		 });   
	}

	find(colection, req){
	
		let id = parseInt(req.query.Id);
		colection.find( { id: id } ).toArray().then(function (docs) {
      		return docs;
    	});		
	}



}



module.exports = new consultas;