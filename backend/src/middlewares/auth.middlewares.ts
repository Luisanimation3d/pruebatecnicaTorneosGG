import {Request, Response, NextFunction} from "express";

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const {email, password} = req.body;

    const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


    try {
        if(email === '' || password === '' || email === undefined || password === undefined){
            res.status(400).json({email: 'El email es requerido', password: 'La contraseña es requerida'});
            return;
        }

        if (!emailValidation.test(email)) {
            res.status(400).json({email: 'El email no es válido'});
            return;
        }

        next();

    }catch (e){
        if (e instanceof Error) {
             return res.status(500).json({msg: e.message});
        }
    }
}