import {DataSource} from "typeorm";

import {EventModel} from "../models/Event.model";
import {ReviewModel} from "../models/Review.model";
import {BookingModel} from "../models/Booking.model";
import {UserModel} from "../models/User.model";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cmsmkkmd3nmc73euse1g-a.oregon-postgres.render.com",
    username: "pruebatecnica_user",
    password: "ppd4Sbr3pw6zPJd9KtQPkMAeSgtKeRZC",
    port: 5432,
    database: "pruebatecnica",
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

// postgres://pruebatecnica_user:ppd4Sbr3pw6zPJd9KtQPkMAeSgtKeRZC@dpg-cmsmkkmd3nmc73euse1g-a.oregon-postgres.render.com/pruebatecnica