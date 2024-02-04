import {Request, Response} from "express";
import {BookingModel} from "../models/Booking.model";
import {JwtPayloadWithTokenData, optionsPagination} from "generaltypes";
import {UserModel} from "../models/User.model";
import {EventModel} from "../models/Event.model";
import * as events from "events";

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData
}

export const getBookings = async (req: ExtendRequest, res: Response) => {

    try {

        // const {id} = req.query;

        const {id} = req.user;

        const {page, limit, order} = req.query;

        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        }

        console.log(id, 'id')

        // Obtener la reservaciónes del usuario

        const bookings = await BookingModel.find({
            where: {
                user: {
                    id: id
                }
            },
            relations: ['user', 'event'],
            order: {
                id: 'DESC'
            },
            take: options.limit,
            skip: (options.page - 1) * options.limit

        })

        if (!bookings) {
            return res.status(404).json({msg: 'No hay bookings'});
        }

        return res.status(200).json({bookings, options});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }

}

export const getBooking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const booking = await BookingModel.findOneBy({id: parseInt(id)});
        if (!booking) {
            return res.status(404).json({msg: 'No existe la reserva'});
        }
        return res.status(200).json({booking});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const createBooking = async (req: ExtendRequest, res: Response) => {
    try {
        const {event, numberBooking} = req.body;
        const {id} = req.user;
        const booking = await BookingModel.create({user: id, event, numberBooking}).save();
        return res.status(200).json({booking, msg: 'Reserva creada'});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const updateBooking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {user, event} = req.body;
        const booking = await BookingModel.findOneBy({id: parseInt(id)});
        if (!booking) {
            return res.status(404).json({msg: 'No existe la reserva'});
        }

        await BookingModel.update({id: parseInt(id)}, {user, event});

        return res.status(200).json({booking});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const inactiveBooking = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const booking = await BookingModel.findOneBy({id: parseInt(id)});
        if (!booking) {
            return res.status(404).json({msg: 'No existe la reserva'});
        }
        console.log(booking, 'booking')
        await BookingModel.update({id: parseInt(id)}, {state: false});
        return res.status(200).json({booking, msg: 'Reserva eliminada'});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}