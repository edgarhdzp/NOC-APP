import mongoose from "mongoose";

interface ConnectionOptions {
	url: string;
	dbName: string;
}

export class MongoDatabase {

	static async connect(opstions: ConnectionOptions){
		const { url, dbName} = opstions;

		try {
			await mongoose.connect(url, {
				dbName
			})
			console.log(`Connected to MongoDB at ${url}`);
		} catch (error) {
			console.log(`Error connecting to MongoDB: ${error}`);
			throw error;
		}
	}

}