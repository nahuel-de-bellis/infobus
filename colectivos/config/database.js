class consultas{
	update(colection, id, lat, lon, call){
		colection.updateOne({id: id}, {$set:{Lat: lat, Long: lon}});
		call();
	}

	select(){

		
	}

}



module.exports = consultas;