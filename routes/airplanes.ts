import { Request, Response, Router, NextFunction } from 'express'
import Airplane from '../models/airplanes.model'
import isLoggedIn from '../middleware/auth'
const router = Router()

router.get('/airplanes', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const airplanes = await Airplane.find({})
        airplanes.length ? res.status(200).send(airplanes) : res.status(404).send({error: "Airplanes not found"})
    } catch (error) {
        next(error)
    }
})

router.get('/airplane/:id', async (req: Request, res: Response, next: NextFunction) =>{  
    const airplaneId = req.params.id
    try {
        const airplane = await Airplane.find({id : airplaneId})
        airplane.length ? res.status(200).send(airplane) : res.status(404).send({
            error: `Airplane with id = ${airplaneId} not found`
        })
    } catch (error) {
        next(error)
    }
})

router.post('/airplane', isLoggedIn, async (req: Request, res: Response, next: NextFunction) =>{  
    const body = req.body
    const airplane = new Airplane(body)
    try {
        await airplane.save()
        res.status(201).send({
            message: "Airplane have successfully saved",
            body: airplane
        })
    } catch (error) {
        next(error)
    }
})

router.put('/airplane/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) =>{  
    const airplaneId = req.params.id
    const body = req.body
    Airplane.countDocuments({id : airplaneId}, (error: any, count: Number) =>{ 
        if(count == 0){
            res.status(404).send({
                error: `Airplane with id = ${airplaneId} not found`
            })
        }
    })
    try {
        const airplane = await Airplane.findOneAndUpdate({id : airplaneId}, body)
        res.status(200).send({
            message: `Airplane with id = ${airplaneId} have successfully updated`,
            body: airplane
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/airplane/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) =>{  
    const airplaneId = req.params.id
    try {
        const airplane = await Airplane.findOneAndDelete({id : airplaneId})
        res.status(204)
    } catch (error) {
        next(error)
    }
})

export default router