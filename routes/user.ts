import { Request, Response, Router, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model'
import isLoggedIn from '../middleware/auth'

dotenv.config()

const router = Router()
const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET)

router.post('/signup', async (req: Request, res: Response, next: NextFunction)=>{
    const username = req.body.username
    const password = req.body.password
    const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\])(?=.*[a-zA-Z]).{8,16}$/
    if (regexPassword.test(password)){
        try {
            const hashedPw = await bcrypt.hash(password, 12)
            const user = new User({username, hashedPw})
            await user.save()
            res.status(201).send({
                message: 'User have successfully registered',
                body: user
            })
        } catch (error) {
            next(error)
        }
    } else{
        res.status(400).send({
            error: {
                "Password must contain": {
                    "characters": {
                      "min": 8,
                      "max": 16
                    },
                    "upperCase": "at least 1",
                    "lowerCase": "at least 1",
                    "number": "at least 1",
                    "specialCharacter": "at least 1 of !@#$%^&*"
                }
             }
        })
    } 

})

router.post('/login', async (req: Request, res: Response, next: NextFunction)=>{
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await User.findOne({username})
        if (user){
            const checkCredentials = await bcrypt.compare(password, user.hashedPw)
            if(checkCredentials){
                const token = await jwt.sign({ username: user.username }, accessTokenSecret, {expiresIn: '20m'})
                await user.updateOne({accessToken: token})
                res.status(200).send({ accessToken: token })
            } else{
                res.status(401).send({error: 'Wrong username or password'})
            }
        } else {
            res.status(404).send({error: `User ${username} does not exist`})
        }
    } catch (error) {
        next(error)
    }
})

router.post('/logout', isLoggedIn, async (req: Request, res: Response, next: NextFunction)=>{
    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(" ")[1]
        const user = await User.updateOne({accessToken: null})
        res.status(200).send({message: 'User successfully logged out'})
    }
})

export default router