import express, { Express, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import airplanesRoutes from './routes/airplanes'
import citiesRoutes from './routes/cities'
import flightsRoutes from './routes/flights'
import userRoutes from './routes/user'
import logger from './middleware/logger'
import mongoConnect from './utils/mongoConnect'

dotenv.config()
const app: Express = express()
const port = process.env.PORT ?? 3000

//middlewares
app.use(express.json())
app.use(bodyParser.json());
app.use(logger)
//routes
app.use(airplanesRoutes)
app.use(citiesRoutes)
app.use(flightsRoutes)
app.use('/user', userRoutes)

/*
async function start() {
  try {
    await connect(`mongodb://${mongoUser}:${mongoPassword}@0.0.0.0:27017/flis?authSource=admin`)
    console.log('⚡️[server]: MongoDB connected')
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
*/

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
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
})

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})


start()
/*
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
*/