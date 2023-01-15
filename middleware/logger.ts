import { Request, Response, NextFunction } from 'express'

const logger  = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toISOString()
    const url = req.protocol + '://' + req.hostname + req.originalUrl;
    console.log(`[${date}] ${req.method} ${url} ${res.statusCode}`)
    next()
}


export default logger