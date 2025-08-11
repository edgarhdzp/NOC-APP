export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
	critical = 'critical'
}

export interface LogEntityOptions {
	level: LogSeverityLevel;
	message: string;
	createdAt?: Date;
	origin: string;
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(options: LogEntityOptions){
		const {level, message, createdAt = new Date(), origin} = options;

		this.message = message;
		this.level = level;
		this.createdAt = createdAt;
		this.origin = origin;
	}

	static fromJson = (json: string): LogEntity => {
		const {message, level, createdAt} = JSON.parse(json);
		if(!message || !level || !createdAt){
			throw new Error('Invalid JSON format for LogEntity');
		}

		const log = new LogEntity({message, level, createdAt, origin});
		log.createdAt = new Date(createdAt);

		return log;
	
	}
}