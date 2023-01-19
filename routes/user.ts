import Router from 'express'
import isLoggedIn from '../middleware/auth'
const userController = require('../controllers/user.controller')
const router = Router()


router.post('/signup', userController.signUp)

router.post('/login', userController.logIn)

router.post('/logout', isLoggedIn, userController.logOut)


export default router