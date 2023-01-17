import { Request, Response, Router, NextFunction } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET)

const isLoggedIn = async (req: any, res: any, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]
      if (token) {        
        const payload = jwt.verify(token, accessTokenSecret)
        if (payload) {
          req.user = payload
          const user = await User.findOne({username: req.user.username})
          if(user && user.accessToken == token){
            next()
          } else {
            res.status(400).send({ error: "Token verification failed" })
          }
        } else {
          res.status(400).send({ error: "Token verification failed" })
        }
      } else {
        res.status(400).send({ error: "Malformed auth header" })
      }
    } else {
      res.status(400).send({ error: "No authorization header" })
    }
  } catch (error) {
    next(error)
  }
}

export default isLoggedIn