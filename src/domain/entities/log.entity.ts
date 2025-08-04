export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
	critical = 'critical'
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogSeverityLevel){
		this.message = message;
		this.level = level;
		this.createdAt = new Date();
	}

	static fromJson = (json: string): LogEntity => {
		const {message, level, createdAt} = JSON.parse(json);
		if(!message || !level || !createdAt){
			throw new Error('Invalid JSON format for LogEntity');
		}

		const log = new LogEntity(message, level);
		log.createdAt = new Date(createdAt);

		return log;
	
	}
}