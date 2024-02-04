import styles from './ReviewCard.module.css';
import moment from "moment";
import 'moment/locale/es';

export const ReviewCard = () => {

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

    return (
        <div className={styles.review__card__container}>
            <div className={styles.review__card__userImage__container}>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user"/>
            </div>
            <div className={styles.review__card__content__container}>
                <div className={styles.review__card__header}>
                    <h4 className={styles.review__card__username}>Jhon Doe</h4>
                    <span className={styles.review__card__date}>{moment('2024-01-31 02:23:59.175').fromNow()}</span>
                </div>
                <p className={styles.review__card__content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Adipisci
                    alias
                    amet
                    aspernatur atque autem cumque, delectus doloremque doloribus eaque eligendi eos
                    error
                    est
                    eum
                    eveniet
                    excepturi expedita facilis fuga harum id in ipsa iure laborum magni maxime
                    minima
                    molestias
                    natus
                    nemo
                    non
                    odio officia optio pariatur placeat porro quae quaerat quas quia quidem
                    quisquam
                    quo
                    ratione
                    recusandae
                    rem
                    repellendus
                    repudiandae
                    rerum
                    saepe
                    sapiente
                    sequi
                    similique
                    sit
                    soluta
                    sunt
                    suscipit
                    tempore
                    tenetur
                    totam
                    ullam
                    unde
                    voluptas
                    voluptates
                    voluptatum.
                </p>
            </div>
        </div>
    )
}