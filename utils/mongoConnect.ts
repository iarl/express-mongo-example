import dotenv from 'dotenv'
import { connect } from 'mongoose'

dotenv.config()
const mongoUser = process.env.MONGODB_USER
const mongoPassword = process.env.MONGODB_PASSWORD
const mongoDatabase = process.env.MONGODB_DATABASE_NAME

async function mongoConnect() {
    try {
      await connect(`mongodb://${mongoUser}:${mongoPassword}@0.0.0.0:27017/${mongoDatabase}?authSource=admin`)
      console.log('⚡️[server]: MongoDB connected')
    } catch (error) {
      console.log(error)
    }
  }

export default mongoConnect