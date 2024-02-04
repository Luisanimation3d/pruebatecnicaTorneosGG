import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {JwtPayloadWithTokenData} from "generaltypes";

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData
}

export const extractUserMiddleware = (req: ExtendRequest, res: Response, next: NextFunction) => {

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if(!token){
                res.status(401).json({msg: 'No autorizado'});
                return;
            }

            const decoded: JwtPayloadWithTokenData = jwt.verify(token, process.env.JWTKEY || 'secret');

            if(!decoded.user.id){
                res.status(401).json({msg: 'No autorizado'});
                return;
            }

            req.user = decoded.user;

            console.log(req.user, 'Llego hasta aqui');

            next();
        }catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({msg: e.message, e:'error del middleware'});
            }
        }
}