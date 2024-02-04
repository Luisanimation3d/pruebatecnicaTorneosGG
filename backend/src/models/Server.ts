import express from 'express';
import morgan from 'morgan';
import {AppDataSource} from "../config/db";
import "reflect-metadata"

import test from "../routes/test";
import userRoutes from "../routes/user.routes";
import reviewRoutes from "../routes/review.routes";
import eventRoutes from "../routes/event.routes";
import bookingRoutes from "../routes/booking.routes";
import authRoutes from "../routes/auth.routes";

export class Server {
    public app: express.Application;
    public port: number = parseInt(process.env.PORT || '') || 3000;
    public testPath: string;
    private readonly userPath: string;
    private readonly reviewPath: string;
    private readonly eventPath: string;
    private readonly bookingPath: string;
    private readonly authPath: string;

    constructor() {
        this.app = express();
        this.middlewares();
        this.port = parseInt(process.env.PORT || '') || 3000;

        this.testPath = '/test';
        this.userPath = '/api/users';
        this.reviewPath = '/api/reviews';
        this.eventPath = '/api/events';
        this.bookingPath = '/api/bookings';
        this.authPath = '/api/auth';

        this.routes();
        this.dbConnection();
    }

    middlewares() {
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization'
            );

            return next();
        });

        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: true}));
    }

    routes() {
        this.app.use(this.testPath, test);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.reviewPath, reviewRoutes);
        this.app.use(this.eventPath, eventRoutes);
        this.app.use(this.bookingPath, bookingRoutes);
        this.app.use(this.authPath, authRoutes);
    }

    async dbConnection() {
        try {
            await AppDataSource.initialize();
            console.log('Database connected');
        } catch (e) {
            console.log(e);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}