import dotenv from 'dotenv'
import { connect } from 'mongoose'

dotenv.config()
const mongoUser = process.env.mongoUser
const mongoPassword = process.env.mongoPassword

async function mongoConnect() {
    try {
      await connect(`mongodb://${mongoUser}:${mongoPassword}@0.0.0.0:27017/flis?authSource=admin`)
      console.log('⚡️[server]: MongoDB connected')
    } catch (error) {
      console.log(error)
    }
  }

export default mongoConnect