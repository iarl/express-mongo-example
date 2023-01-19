import Router from 'express'
import isLoggedIn from '../middleware/auth'
const aircraftController =  require('../controllers/aircraft.controller')
const router = Router()


router.get('/', aircraftController.getAll)

router.get('/:id', aircraftController.getById)

router.post('/', isLoggedIn, aircraftController.save)

router.put('/:id', isLoggedIn, aircraftController.update)

router.delete('/:id', isLoggedIn, aircraftController.delete)


export default router