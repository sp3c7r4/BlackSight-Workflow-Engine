import R, { Redis } from 'ioredis'
import env from '../config/env'
import Logger from './Logger';

const redis: Redis = new R({ host: env.REDIS_HOST, port: env.REDIS_PORT, lazyConnect: true })

const log = new Logger().logger

export default async function connectRedis(redis: Redis) {
  try {
    redis.connect();
    log.info('Redis connected');
  } catch(e) {
    log.error('Redis connection error', e);
  }
}

export { redis }