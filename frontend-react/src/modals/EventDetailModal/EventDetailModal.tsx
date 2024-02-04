import styles from './EventDetailModal.module.css';
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import {event} from "../../types/generaltypes";
import {Loader} from "../../components/Loader/Loader.tsx";
import {useNavigate} from "react-router-dom";

export const EventDetailModal = ({id, owner = false}: { id: number, owner?: boolean }) => {

    moment.locale('es', {
        months: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],
        weekdays: [
            "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
        ]
    });

    const navigate = useNavigate();

    const [event, setEvent] = useState<event | null>(null);

    const {data, loading, get} = useFetch('http://localhost:3000/api')

    useEffect(() => {
        get(`/events/${id}`)
    }, []);

    useEffect(() => {
        if (data) {
            setEvent(data.event);
        }
    }, [data]);

    return (
        <>
            {
                loading ? (<Loader/>) : (
                    <>
                        <div className={styles.image__container}>
                            <img
                                src={`http://localhost:3000/api/events/image/${event?.image}`}
                                alt="event"/>
                        </div>
                        <div className={styles.content__container}>
                            <h2 className={styles.event__title}>{event?.name}</h2>
                            <p className={styles.event__date}>{moment(event?.date).format('dddd DD [de] MMMM [de] YYYY')}</p>
                            <p className={styles.event__description}>{event?.description}</p>
                            {
                                !owner &&
                                <Button text={event?.number_assistants === 0 ? 'Agotado' : 'Hacer Reservación'}
                                        onClick={() => {
                                            navigate(`/booking-event/${id}`)
                                        }}
                                        autosize={false} disabled={event?.number_assistants === 0}

                                />
                            }
                            <span className={styles.places__aviables} style={{
                                color: event?.number_assistants === 0 ? 'red' : event?.number_assistants && event.number_assistants < 10 ? '#ae455b' : '#26415c'
                            }}>Quedan {event?.number_assistants} lugares disponibles</span>
                        </div>
                    </>
                )
            }
        </>
    )
}