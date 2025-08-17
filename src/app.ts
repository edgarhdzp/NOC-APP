import { envs } from './config/plugins/envs.plugins';
import { MongoDatabase } from './data/mongo';
import { PrismaClient } from './generated/prisma';
import { Server } from './presentation/server';

(async () => {
	main();
})()

async function main() {
	await MongoDatabase.connect({
		url: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME
	});

	Server.start();
}
