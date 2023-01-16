import { Request, Response, Router, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET)

const isLoggedIn = async (req: any, res: any, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]
      if (token) {
        const payload = await jwt.verify(token, accessTokenSecret)
        if (payload) {
          req.user = payload;
          next()
        } else {
          res.status(400).json({ error: "token verification failed" })
        }
      } else {
        res.status(400).json({ error: "malformed auth header" })
      }
    } else {
      res.status(400).json({ error: "No authorization header" })
    }
  } catch (error) {
    next(error)
  }
}

export default isLoggedIn