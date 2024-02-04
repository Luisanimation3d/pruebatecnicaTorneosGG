import fs from 'fs';
import path from 'path';
import {Request, Response} from "express";
import {EventModel} from "../models/Event.model";
import {JwtPayloadWithTokenData, optionsPagination} from "generaltypes";
import {UserModel} from "../models/User.model";

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData
}

export const getEvents = async (req: Request, res: Response) => {

    try {

        const {page, limit, order} = req.query;

        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        }

        const events = await EventModel.findAndCount({
            skip: options.limit * (options.page - 1),
            take: options.limit,
            order: {
                [options.order[0]]: options.order[1]
            },
        });

        if (!events) {
            return res.status(404).json({msg: 'No hay eventos'});
        }

        return res.status(200).json({events, options});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const getEvent = async (req: Request, res: Response) => {

    try {
        const {id} = req.params;
        const event = await EventModel.findOneBy({id: parseInt(id)});
        if (!event) {
            return res.status(404).json({msg: 'No existe el evento'});
        }

        const bookings = await EventModel.find({
            where: {id: parseInt(id)},
            relations: ['bookings']
        });

        // Sumar todos los numberBooking de bookings
        let totalBookings = 0;

        bookings[0].bookings.forEach((booking: any) => {
            totalBookings += booking.state ? booking.numberBooking : 0;
        });

        return res.status(200).json({event: {...event, number_assistants: event.number_assistants - totalBookings}});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const createEvent = async (req: ExtendRequest, res: Response) => {
    try {
        const {id} = req.user;
        const {name, description, date, number_assistants, image} = req.body;

        if(!name) {
            return res.status(400).json({name: 'El nombre es requerido'});
        }
        if (!description) {
            return res.status(400).json({description: 'La descripción es requerida'});
        }
        if (!date) {
            return res.status(400).json({date: 'La fecha es requerida'});
        }
        if (!number_assistants) {
            return res.status(400).json({number_assistants: 'El número de asistentes es requerido'});
        }
        if (!image) {
            return res.status(400).json({image: 'La imagen es requerida'});
        }

        if(new Date(date) < new Date()) {
            return res.status(400).json({date: 'La fecha no puede ser menor a la actual'});
        }

        const event = await EventModel.create({name, description, date, number_assistants, image, user: id}).save();
        return res.status(200).json({event, msg: 'Evento creado'});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, description, date, number_assistants, image} = req.body;
        const event = await EventModel.findOneBy({id: parseInt(id)});
        if (!event) {
            return res.status(404).json({msg: 'No existe el evento'});
        }
        await EventModel.update({id: parseInt(id)}, {name, description, date, number_assistants, image});
        return res.status(200).json({event});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const inactiveEvent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const event = await EventModel.findOneBy({id: parseInt(id)});
        if (!event) {
            return res.status(404).json({msg: 'No existe el evento'});
        }
        await EventModel.update({id: parseInt(id)}, {state: !event.state});
        return res.status(200).json({event});
    } catch (e) {
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

export const getImage = (req: Request, res: Response) => {
    const {image} = req.params;
    const imagePath = `./src/uploads/events/${image}`;

    fs.access(imagePath, (err) => {
        if (err) {
            return res.sendFile(path.resolve('./src/uploads/events/default.jpg'));
        }
        res.sendFile(path.resolve(imagePath));
    });
}

export const getEventsByUser = async (req: ExtendRequest, res: Response) => {
    try {
        const {id} = req.user;

        const user = await UserModel.find({
            where: {id: id},
            relations: ['events']
        });

        if (!user) {
            return res.status(404).json({msg: 'No existe el usuario'});
        }

        return res.status(200).json({events: user[0].events});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}