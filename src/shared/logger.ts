// import winston from 'winston'
import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format

//custom logger
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const sec = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minutes}:${sec} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: '✅ success!' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: '❌ error !' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
})

export { logger, errorLogger }
