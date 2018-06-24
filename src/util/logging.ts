import { createLogger, format, transports } from "winston";

const log = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(l => `${l.timestamp} ${l.level}: ${l.message}`)),
    transports: [new transports.Console()]
});

export default log;