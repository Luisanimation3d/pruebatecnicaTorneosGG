import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { ReviewModel } from "./Review.model";
import {BookingModel} from "./Booking.model";
import {EventModel} from "./Event.model";

@Entity('users')
export class UserModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthday: Date;

    @Column()
    image: string;

    @Column({
        default: true
    })
    state: boolean;

    @OneToMany(() => EventModel, event => event.user)
    events: EventModel[];

    @OneToMany(() => ReviewModel, review => review.user)
    reviews: ReviewModel[];

    @OneToMany(() => ReviewModel, review => review.user)
    bookings: BookingModel[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}