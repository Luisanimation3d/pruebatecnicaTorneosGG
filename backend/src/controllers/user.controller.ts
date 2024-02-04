import {Request, Response} from "express";
import bycript from "bcrypt";
import {UserModel} from "../models/User.model";
import {JwtPayloadWithTokenData, optionsPagination} from "generaltypes";
import fs from "fs";
import path from "path";

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData
}

export const getUsers = async (req: Request, res: Response) => {

    try {

        const {page, limit, order} = req.query;

        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        }

        const users = await UserModel.findAndCount({
            skip: options.limit * (options.page - 1),
            take: options.limit,
            order: {
                [options.order[0]]: options.order[1]
            },
        });

        if (!users) {
            return res.status(404).json({msg: 'No hay usuarios'});
        }

        return res.status(200).json({users, options});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }

}

export const getUser = async (req: ExtendRequest, res: Response) => {
    try {
        const {id} = req.user
        console.log(id);
        const user = await UserModel.findOneBy({id: parseInt(id)});
        if (!user) {
            return res.status(404).json({msg: 'No existe el usuario'});
        }
        return res.status(200).json({user});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const {firstname, lastname, email, password, birthday, image} = req.body;
        const passwordHash = bycript.hashSync(password, 10);
        const user = await UserModel.create({firstname, lastname, email, password: passwordHash, birthday, image}).save();
        if (!user) {
            return res.status(404).json({msg: 'No se pudo crear el usuario'});
        }
        return res.status(200).json({user, msg: 'Usuario creado'});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {firstname, lastname, email, password, birthday} = req.body;
        const passwordHash = bycript.hashSync(password, 10);
        const user = await UserModel.findOneBy({id: parseInt(id)});
        if (!user) {
            return res.status(404).json({msg: 'No existe el usuario'});
        }
        await UserModel.update({id: parseInt(id)}, {firstname, lastname, email, password: passwordHash, birthday});

        return res.status(200).json({msg: 'Usuario actualizado'});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const inactiveUser = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const user = await UserModel.findOneBy({id: parseInt(id)});
        if (!user) {
            return res.status(404).json({msg: 'No existe el usuario'});
        }
        await UserModel.update({id: parseInt(id)}, {state: false});

        return res.status(200).json({msg: 'Usuario eliminado'});
    }catch (e){
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({msg: 'No se subió imagen'});
        }

        let fileName: string[] = req.file?.originalname.split('\.');

        const ext = fileName[fileName.length - 1];
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        if (!allowedExtensions.includes(ext)) {
            fs.unlink(req.file.path, err => {
                console.log(err)
            });
            return res.status(400).json({msg: 'Extension no permitida'});
        }

        console.log(req.file.filename);
        return res.status(200).json({msg: 'Imagen subida', image: req.file.filename});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const getImage = async (req: Request, res: Response) => {
    const {image} = req.params;
    const imagePath = `./src/uploads/users/${image}`;

    fs.access(imagePath, (err) => {
        if (err) {
            return res.sendFile(path.resolve('./src/uploads/users/default.png'));
        }
        res.sendFile(path.resolve(imagePath));
    });
}