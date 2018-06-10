const mongoClient = require("mongodb").MongoClient;

module.exports = (database) => {
	const url = "mongodb://localhost:27017";

	return new Promise((resuelve, error)=>{
		mongoClient.connect(url, (err, ress)=>{
			let db = ress.db(database);
			
			resuelve(db);
		});

	});

	
}