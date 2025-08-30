import { connect } from 'mongoose'
import env from '../config/env'
import Logger from '../utils/Logger'

const MONGO_URI=`${env.DIALECT}://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`
const log = new Logger().logger

export default async function connectNoSql() {
  try {
    await connect(MONGO_URI)
    log.info('MongoDB connected');
  } catch(e) {
    log.error('MongoDB connection error', e);
  }
}