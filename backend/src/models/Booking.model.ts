import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserModel} from "./User.model";
import {EventModel} from "./Event.model";

@Entity('bookings')
export class BookingModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, user => user.id)
    user: UserModel;

    @ManyToOne(() => EventModel , event => event.id)
    event: EventModel;

    @Column()
    numberBooking: number;

    @Column({
        default: true
    })
    state: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}