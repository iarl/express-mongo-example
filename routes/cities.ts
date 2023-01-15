import { Request, Response, Router } from 'express'
import cities from '../models/cities.model'
const router = Router()

router.get('/cities', async (req: Request, res: Response) =>{
    res.send({'airplane': 'test'})
})

router.get('/city/:id', async (req: Request, res: Response) =>{  
    res.send({'airplane1': 'test'})
})

export default router