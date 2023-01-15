import { Request, Response, Router } from 'express'
import flights from '../models/flights.model'
const router = Router()

router.get('/flights', async (req: Request, res: Response) =>{
    res.send({'airplane': 'test'})
})

router.get('/flight/:id', async (req: Request, res: Response) =>{  
    res.send({'airplane1': 'test'})
})

export default router