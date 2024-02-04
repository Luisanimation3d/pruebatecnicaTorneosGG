import {DataSource} from "typeorm";

import {EventModel} from "../models/Event.model";
import {ReviewModel} from "../models/Review.model";
import {BookingModel} from "../models/Booking.model";
import {UserModel} from "../models/User.model";
import * as process from "process";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOSTPG || 'dpg-cmsmkkmd3nmc73euse1g-a.oregon-postgres.render.com',
    username: process.env.USERPG || 'pruebatecnica_user',
    password: process.env.PASSPG || 'ppd4Sbr3pw6zPJd9KtQPkMAeSgtKeRZC',
    port: 5432,
    database: process.env.DBPG || 'pruebatecnica',
    entities: [
        EventModel,
        ReviewModel,
        BookingModel,
        UserModel
    ],
    synchronize: true,
    logging: true,
    ssl: true,
    dropSchema: true,
})