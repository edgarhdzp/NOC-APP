import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
	 new FileSystemDataSource()
)
const MongologRepository = new LogRepositoryImpl(
	 new MongoDataSource()
)
const postgreslogRepository = new LogRepositoryImpl(
	new PostgresLogDataSource()
)

const emailService = new EmailService();

export class Server {
	public static start(){
		// console.log('Server is running...');
		// new SendEmailLogs(
		// 	emailService,
		// 	fileSystemLogRepository
		// ).execute('edgardaniel1023@gmail.com')
		// emailService.sendEmailWithAttachment('edgardaniel1023@gmail.com')
		CronService.createJob(
			'*/5 * * * * *',
			() => {
				const url = 'https://google.com';
				new CheckServiceMultiple(
					[fsLogRepository, MongologRepository, postgreslogRepository],
					() => console.log(`${url} is ok`),
					(error) => console.error('CheckService: Error fetching URL:', error)
				).execute(url)
			}
		);
	}
}