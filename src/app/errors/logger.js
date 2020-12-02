import { createLogger, format, transports } from 'winston';

export default createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.simple(),
                format.timestamp(),
                format.printf(
                    info =>
                        `[${new Date().toUTCString()}] - ${info.level}: ${
                            info.message
                        }`
                )
            ),
        }),
    ],
});
