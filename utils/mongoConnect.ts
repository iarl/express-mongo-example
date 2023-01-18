import dotenv from 'dotenv'
import { connect } from 'mongoose'

dotenv.config()
const mongoUrl = process.env.MONGODB_URL
const mongoUser = process.env.MONGODB_USER
const mongoPassword = process.env.MONGODB_PASSWORD
const mongoDatabase = process.env.MONGODB_DATABASE_NAME

async function mongoConnect() {
    try {
      await connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoUrl}/${mongoDatabase}?authSource=admin`)
      console.log('⚡️[server]: MongoDB connected')
    } catch (error) {
      console.log(error)
    }
  }

export default mongoConnect