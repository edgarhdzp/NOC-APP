import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceIMultiplenterface {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceIMultiplenterface {

  constructor(
	private readonly LogRepository: LogRepository[],
	private readonly successCallback?: SuccessCallback | undefined,
	private readonly errorCallback?: ErrorCallback | undefined
  ){}	

  private callLogs( log: LogEntity ) {
	this.LogRepository.forEach ( logRepository => {
		logRepository.saveLog(log)
	})
  }

  async execute (url: string): Promise<boolean> {
	try {

		const req = await fetch(url)
		if(!req.ok) throw new Error(`Error fetching ${url}`);

		const log = new LogEntity({
			message: `Service ${url} working`,
			level:LogSeverityLevel.low,
			origin: 'check-service.ts'
		});
		this.callLogs(log)
		this.successCallback && this.successCallback?.();
		return true

	} catch (error) {

		const errorMessage = `${url} is failed ${error}`
		const log = new LogEntity({
			message: `${errorMessage}`, 
			level: LogSeverityLevel.high,
			origin: 'check-service.ts'
		});
		this.callLogs(log)
		this.errorCallback && this.errorCallback?.(`${errorMessage}`);

		return false

	}
  }
}