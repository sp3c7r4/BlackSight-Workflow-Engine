import { connect } from 'mongoose'
import env from '../config/env'

const MONGO_URI=`${env.DIALECT}://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`

export default async function connectNoSql() {
  try {
    await connect(MONGO_URI)
  } catch(e) {
    console.error()
  }
}
