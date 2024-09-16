import { createLogger, format, transports } from "winston";
import { ILogger } from "../../domain/interfaces/ILogger";

export class WinstonLogger implements ILogger {
    private logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp(),
            format.json(),
            format.printf(({ timestamp, level, message, context}) => {
                return `${timestamp} [${level.toUpperCase()}]: ${message} ${context ? JSON.stringify(context) : ''}`;
            })
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: "log/app.log", level: 'error' })
        ]
    })

    info(message: string, context?: any): void {
        this.logger.info(message, { context });
    }
    warn(message: string, context?: any): void {
        this.logger.warn(message, { context });
    }
    error(message: string, context?: any): void {
        this.logger.error(message, { context })
    }
}