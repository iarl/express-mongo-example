import { Request, Response, Router, NextFunction } from 'express'
import Aircraft from '../models/aircrafts.model'
import isLoggedIn from '../middleware/auth'
const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const aircrafts = await Aircraft.find({})
        aircrafts.length ? res.status(200).send(aircrafts) : res.status(404).send({error: "aircrafts not found"})
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) =>{  
    const aircraftId = req.params.id
    try {
        const aircraft = await Aircraft.find({id: aircraftId})
        aircraft.length ? res.status(200).send(aircraft) : res.status(404).send({
            error: `Aircraft with id = ${aircraftId} not found`
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) =>{  
    const body = req.body
    const aircraft = new Aircraft(body)
    try {
        await aircraft.save()
        res.status(201).send({
            message: "Aircraft have successfully saved",
            body: aircraft
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) =>{  
    const aircraftId = req.params.id
    const body = req.body
    Aircraft.countDocuments({id : aircraftId}, async (error: any, count: Number) =>{ 
        if(count == 0){
            res.status(404).send({
                error: `Aircraft with id = ${aircraftId} not found`
            })
        } else {
            try {
                const aircraft = await Aircraft.findOneAndUpdate({id: aircraftId}, body)
                res.status(200).send({
                    message: `Aircraft with id = ${aircraftId} have successfully updated`,
                    body: aircraft
                })
            } catch (error) {
                next(error)
            }
        }
    })
})

router.delete('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) =>{  
    const aircraftId = req.params.id
    try {
        const aircraft = await Aircraft.findOneAndDelete({id: aircraftId})
        res.status(204)
    } catch (error) {
        next(error)
    }
})

export default router