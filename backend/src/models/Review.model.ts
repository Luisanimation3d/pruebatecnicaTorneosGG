import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";

import { UserModel } from "./User.model";
import { EventModel } from "./Event.model";


@Entity('reviews')
export class ReviewModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, user => user.id)
    user: UserModel;

    @ManyToOne(() => EventModel, event => event.id)
    event: EventModel;

    @Column()
    date: Date;

    @Column()
    title: string;

    @Column()
    comment: string;

    @Column()
    qualification: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}