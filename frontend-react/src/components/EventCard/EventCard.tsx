import styles from './EventCard.module.css';
import moment from 'moment';
import {eventCardProps} from "../../types/generaltypes";

export function EventCard({event, onClick, cancelled = false}: eventCardProps) {

    const {id, name, description, date, image = "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} = event;

    moment.locale('es', {
        months: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ]
    });

    return (
        <div className={`${styles.event__card__container} ${cancelled ? styles.event__cardd__cancelled : ''}`}>
            <div className={`${styles.event_card_image_container}`}>
                <img
                    src={`http://localhost:3000/api/events/image/${image}`}
                    alt={name}
                    className={styles.event_card_image}
                />
            </div>
            <div className={styles.event_card_info_container}>
                <h3 className={`${styles.event_card_info_title}`}>{name}</h3>
                <p className={`${styles.event_card_info_description}`}>
                    {description}
                </p>
                <span
                    className={`${styles.event_card_info_date}`}>{moment(date).locale('es').format('MMMM D, YYYY')}</span>
                <button onClick={()=> onClick(id)} className={`${styles.event_card_info_button}`}>Ver más</button>
            </div>
        </div>
    );
}