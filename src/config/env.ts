import { z } from "zod";
import 'dotenv/config'

const EnvSchema = z.object({
  MONGO_DB: z.string(),
  MONGO_PORT: z.string().transform(val => parseInt(val)),
  MONGO_HOST: z.string(),
  DIALECT: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(val => parseInt(val)),
  REDIS_PASSWORD: z.string(),
  LOGGER_LEVEL: z.string(),
  WINSTON_TRANSPORTS_HTTP_HOST: z.string(),
  WINSTON_TRANSPORTS_HTTP_PORT: z.string().transform(val => parseInt(val)),
  WINSTON_TRANSPORTS_HTTP_PATH: z.string(),
  WINSTON_TRANSPORTS_HTTP_SSL: z.string().transform(val => Boolean(val)),
  PORT: z.string().transform(val => parseInt(val)),
  API_VERSION: z.string()
})

export type EnvType = z.infer<typeof EnvSchema> 

const env: EnvType = EnvSchema.parse(process.env)
export default env;