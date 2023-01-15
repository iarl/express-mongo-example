import { Request, Response, Router, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model'

dotenv.config()

const router = Router()
const accessTokenSecret = String(process.env.accessTokenSecret)

router.post("/signup", async (req: Request, res: Response, next: NextFunction)=>{
    const username = req.body.username
    const password = req.body.password
    try {
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({username, hashedPw})
        await user.save()
        res.status(201).send({
            message: "User have successfully registered",
            body: user
        })
    
    } catch (error) {
        next(error)
    }
})

router.post("/login", async (req: Request, res: Response, next: NextFunction)=>{
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await User.findOne({username})
        if (user){
            const checkCredentials = await bcrypt.compare(password, user.hashedPw)
            if(checkCredentials){
                const token = await jwt.sign({ username: user.username }, accessTokenSecret)
                res.status(200).send({ accessToken: token })
            } else{
                res.status(401).send({error: "Wrong username or password"})
            }
        } else {
            res.status(404).send({error: `User ${username} does not exist`})
        }
    } catch (error) {
        next(error)
    }
})

export default router