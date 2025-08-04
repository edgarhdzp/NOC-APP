import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceInterface {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceInterface {
  constructor(
	private readonly LogRepository: LogRepository,
	private readonly successCallback?: SuccessCallback | undefined,
	private readonly errorCallback?: ErrorCallback | undefined
  ){

  }	
  async execute (url: string): Promise<boolean> {
	try {

		const req = await fetch(url)
		if(!req.ok) throw new Error(`Error fetching ${url}`);

		const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
		this.LogRepository.saveLog(log)
		this.successCallback && this.successCallback?.();
		return true

	} catch (error) {

		const errorMessage = `${url} is failed ${error}`
		const log = new LogEntity(`${errorMessage}`, LogSeverityLevel.high);
		this.LogRepository.saveLog(log)
		this.errorCallback && this.errorCallback?.(`${errorMessage}`);

		return false

	}
  }
}