import { createLogger, format, transports } from 'winston';

class Logger {
    private logger;

    constructor() {
        this.logger = createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            defaultMeta: { service: 'mobile-automation' },
            transports: [
                new transports.File({ filename: 'logs/error.log', level: 'error' }),
                new transports.File({ filename: 'logs/combined.log' }),
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                })
            ]
        });
    }

    info(message: string, meta?: any) {
        this.logger.info(message, meta);
    }

    error(message: string, meta?: any) {
        this.logger.error(message, meta);
    }

    warn(message: string, meta?: any) {
        this.logger.warn(message, meta);
    }

    debug(message: string, meta?: any) {
        this.logger.debug(message, meta);
    }
}

export default new Logger(); 