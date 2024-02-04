import styles from './ReviewCard.module.css';
import moment from "moment";
import 'moment/locale/es';
import {ReviewElement} from "../../types/generaltypes";

export const ReviewCard = ({review}: ReviewElement) => {

    moment.locale('es', {
        relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: 'unos segundos',
            ss: '%d segundos',
            m: 'un minuto',
            mm: '%d minutos',
            h: 'una hora',
            hh: '%d horas',
            d: 'un día',
            dd: '%d días',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años'
        }
    });

    // Capturar la fecha de creación del comentario y mostrarla en formato relativo (hace 2 días, hace 3 horas, etc) con moment.js y la configuración de idioma en español (moment.locale('es')) y con la zona horaria local del usuario.

    const fechaActual = new Date();

    const diferenciaHoraria = fechaActual.getTimezoneOffset() - new Date(review.createdAt).getTimezoneOffset();

    const fechaConvertida = new Date(new Date(review.createdAt).getTime() + (diferenciaHoraria * 60 * 1000));


    return (
        <div className={styles.review__card__container}>
            <div className={styles.review__card__userImage__container}>
                <img src={`http://localhost:3000/api/users/image/${review.user.image}`} alt="user"/>
            </div>
            <div className={styles.review__card__content__container}>
                <div className={styles.review__card__header}>
                    <h4 className={styles.review__card__username}>{review.user.firstname} {review.user.lastname}</h4>
                    <span className={styles.review__card__date}>{moment(fechaConvertida).fromNow()}</span>
                </div>
                <p className={styles.review__card__content}>
                    {
                        review.comment
                    }
                </p>
            </div>
        </div>
    )
}