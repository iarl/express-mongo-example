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