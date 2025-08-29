import R, { Redis } from 'ioredis'
import env from '../config/env'

const redis = new R({ host: env.REDIS_HOST, port: env.REDIS_PORT, lazyConnect: true })

async function connectRedis() {
  try {
    await redis.connect()
    console.log("Connected to redis ")
  } catch(e) {
    throw new Error(e instanceof Error ? e.message : String(e))
  }
}

(async () => {
  await connectRedis()
})()


export default class BullMq {
  private redis: Redis | undefined

  constructor(redis?: Redis) {
    this.redis = redis
  }
}


