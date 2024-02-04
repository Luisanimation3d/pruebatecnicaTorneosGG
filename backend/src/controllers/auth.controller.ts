import {Request, Response} from 'express';
import {UserModel} from "../models/User.model";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (email === '') {
        return res.status(400).json({msg: 'El email es requerido'});
    }

    if (password === '') {
        return res.status(400).json({msg: 'La contraseña es requerida'});
    }

    const user = await UserModel.findOne({where: {email}});

    if (!user) {
        return res.status(400).json({
            email: 'El email o la contraseña son incorrectos',
            password: 'El email o la contraseña son incorrectos'
        });
    }

    if (!user.state) {
        return res.status(400).json({
            email: 'El email o la contraseña son incorrectos',
            password: 'El email o la contraseña son incorrectos'
        });
    }

    const validPassword = bycript.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            email: 'El email o la contraseña son incorrectos',
            password: 'El email o la contraseña son incorrectos'
        });
    }

    const token = jwt.sign({
        user: {
            id: user.id,
        }
    }, process.env.JWTKEY || 'secret', {expiresIn: 60 * 60});

    res.status(200).json({token, user: `${user.firstname} ${user.lastname}`});

}
