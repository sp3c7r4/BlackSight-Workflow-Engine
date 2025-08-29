import { createLogger, format, transports } from 'winston';
import env from '../config/env';
import chalk from 'chalk';
import { Request } from 'express';

type LoggerLevel = 'info' | 'warn' | 'error' | 'http' | 'verbose' | 'debug' | 'silly'
const { combine, timestamp, errors, json, colorize } = format

class Logger {
  private level: LoggerLevel | string = env.LOGGER_LEVEL || 'info'

  public logger = createLogger({
    level: this.level || 'info',
    format: combine(json(), timestamp(), colorize({ colors: { info: 'blue', error: 'red' }, all: true })),
    transports: [new transports.Console()],
  });

  public requestLogger(method: string, path: string, body?: Request['body']) {
   const METHOD = method.toUpperCase();
   const PATH = path;
   const BODY = JSON.stringify(body);
   const COLORIZE = (text: string, color: string) => ` ${chalk[color](text)} `

   switch (METHOD) {
    case 'GET':
      console.log(chalk.bgGreen(COLORIZE(METHOD, 'white')) + COLORIZE(PATH, 'white'));
      break;
    case 'POST':
      console.log(chalk.bgYellow(COLORIZE(METHOD, 'white')) + COLORIZE(PATH, 'white') + BODY );
      break;
    case 'DELETE':
      console.log(chalk.bgRed(COLORIZE(METHOD, 'white')) + COLORIZE(PATH, 'white'));
      break;
    case 'PUT':
    case 'PATCH':
      console.log(chalk.bgBlue(COLORIZE(METHOD, 'white')) + COLORIZE(PATH, 'white'));
      break;
    default:
      console.log(chalk.bgGray(COLORIZE(METHOD, 'white')) + COLORIZE(PATH, 'white'));
   }
  }

  public fileLogger = createLogger({
    level: 'info',
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' })
    ]
  })

  public httpLogger = createLogger({
    transports: [
      new transports.Http({
        host: env.WINSTON_TRANSPORTS_HTTP_HOST,
        port: env.WINSTON_TRANSPORTS_HTTP_PORT,
        path: env.WINSTON_TRANSPORTS_HTTP_PATH,
        ssl: env.WINSTON_TRANSPORTS_HTTP_SSL
      })
    ]
  })
}

export default Logger;

const e = new Error("hi")

// const me = new Logger().fileLogger
// me.error(e)