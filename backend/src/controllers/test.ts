import {Response, Request} from 'express';

export function getTest(req: Request, res: Response){
    return res.status(200).json({
        ok: true,
        msg: 'Todo bien',
        data: {
            nombre: 'Hola',
            funciona: 'Si',
            edad: 20
        }
    })
}