import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ReviewModel} from "./Review.model";
import {BookingModel} from "./Booking.model";
import {UserModel} from "./User.model";

@Entity('events')
export class EventModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    number_assistants: number;

    @Column()
    image: string;

    @Column({
        default: true
    })
    state: boolean;

    @ManyToOne(() => UserModel, user => user.events)
    user: UserModel;

    @OneToMany(() => ReviewModel, review => review.event)
    reviews: ReviewModel[];

    @OneToMany(() => BookingModel, booking => booking.event)
    bookings: BookingModel[];

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}