import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron-service";

export class Server {
	public static start(){
		console.log('Server is running...');

		CronService.createJob(
			'*/5 * * * * *',
			() => {
				// new CheckService().execute('https://google.com')
				new CheckService(
					() => console.log('success'),
					(error) => console.error('CheckService: Error fetching URL:', error)
				).execute('http://localhost:3000')
			}
		);
	}
}