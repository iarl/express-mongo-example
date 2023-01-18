import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import aircraftsRoutes from './routes/aircrafts'
import citiesRoutes from './routes/cities'
import flightsRoutes from './routes/flights'
import userRoutes from './routes/user'
import mongoConnect from './utils/mongoConnect'
import morgan from 'morgan'
const mongooseMorgan = require('mongoose-morgan')

dotenv.config()
const app: Express = express()
const port = process.env.PORT ?? 3000

// LOGS
//save errors into database
const mongoUrl = process.env.MONGODB_URL
const mongoUser = process.env.MONGODB_USER
const mongoPassword = process.env.MONGODB_PASSWORD
const mongoDatabase = process.env.MONGODB_DATABASE_NAME
morgan.token('url', function (req: any, res: any) { 
  return req.protocol + '://' + req.hostname + req.originalUrl 
})

const format = ':date[iso] :remote-addr :method :url :status :response-time ms :user-agent'

app.use(mongooseMorgan({
  collection: 'error_logger',
  connectionString: `mongodb://${mongoUser}:${mongoPassword}@${mongoUrl}/${mongoDatabase}?authSource=admin`,
  user: mongoUser,
  pass: mongoPassword
 },
 {},
 format))

//show log in console
//app.use(morgan(format))

//middlewares
app.use(express.json())
app.use(bodyParser.json())

//routes
app.use('/aircrafts',aircraftsRoutes)
app.use(citiesRoutes)
app.use(flightsRoutes)
app.use('/user', userRoutes)


async function start() {
  try {
    await mongoConnect()
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

// Unknown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any
  error.statusCode = 404
  next(error)
})

// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || 'error'
  error.statusCode = error.statusCode || 500

  res.status(error.statusCode).send({
    status: error.status,
    message: error.message
  })
})

start()