import {Request, Response} from "express";
import {ReviewModel} from "../models/Review.model";
import {JwtPayloadWithTokenData, optionsPagination} from "generaltypes";
import {EventModel} from "../models/Event.model";

interface ExtendRequest extends Request {
    user?: JwtPayloadWithTokenData
}


export const getReviews = async (req: Request, res: Response) => {

    try {

        const {page, limit, order} = req.query;

        const options: optionsPagination = {
            page: parseInt(page as string, 10) || 1,
            limit: parseInt(limit as string, 10) || 10,
            order: order ? JSON.parse(order as string) : ['id', 'ASC'],
        }

        const reviews = await ReviewModel.findAndCount({
            skip: options.limit * (options.page - 1),
            take: options.limit,
            order: {
                [options.order[0]]: options.order[1]
            },
        });

        if (!reviews) {
            return res.status(404).json({msg: 'No hay reviews'});
        }

        return res.status(200).json({reviews, options});

    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }

}

export const getReview = async (req: Request, res: Response) => {

    try {
        const {id} = req.params;
        const event = await EventModel.findOne({
            where: {id: parseInt(id)}
        });

        if (!event) {
            return res.status(404).json({msg: 'No existe el evento'});
        }

        const reviews = await ReviewModel.find({
            where: {
                event: {
                    id: parseInt(id)
                }
            },
            relations: ['user']
        });

        let totalQualification = 0;
        reviews.forEach((review: any) => {
            totalQualification += review.qualification;
        })


        return res.status(200).json({event, reviews, totalQualification: totalQualification / reviews.length});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const createReview = async (req: ExtendRequest, res: Response) => {
    try {
        const {event, title, comment, qualification} = req.body;

        if (!title) {
            return res.status(400).json({title: 'El título es requerido'});
        }

        if (!comment) {
            return res.status(400).json({comment: 'El comentario es requerido'});
        }

        if (!qualification) {
            return res.status(400).json({qualification: 'La calificación es requerida'});
        }

        const {id: userId} = req.user;

        const review = await ReviewModel.create({user: userId, event, title, comment, qualification}).save();
        return res.status(201).json({review, msg: 'Review creada'});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const updateReview = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {user, event, comment, qualification} = req.body;
        const review = await ReviewModel.findOneBy({id: parseInt(id)});
        if (!review) {
            return res.status(404).json({msg: 'No existe la review'});
        }

        await ReviewModel.update(review.id, {user, event, comment, qualification});

        return res.status(200).json({review});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const review = await ReviewModel.findOneBy({id: parseInt(id)});
        if (!review) {
            return res.status(404).json({msg: 'No existe la review'});
        }
        await ReviewModel.delete(review.id);
        return res.status(200).json({msg: 'Review eliminada'});
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            res.status(500).json({msg: e.message});
        }
    }
}