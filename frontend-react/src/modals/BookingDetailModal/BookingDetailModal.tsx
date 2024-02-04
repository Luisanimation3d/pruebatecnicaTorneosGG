import styles from '../EventDetailModal/EventDetailModal.module.css';
import {Button} from "../../components/Button/Button.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import {event} from "../../types/generaltypes";
import {Loader} from "../../components/Loader/Loader.tsx";
import Swal from "sweetalert2";

export const BookingDetailModal = ({idEvent, idBooking, getMethod}: {
    idEvent: number,
    idBooking: number,
    getMethod: () => void
}) => {

    moment.locale('es', {
        months: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],
        weekdays: [
            "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
        ]
    });


    const [event, setEvent] = useState<event | null>(null);

    const {data, loading, get} = useFetch('http://localhost:3000/api')
    const {data: dataBooking, loading: loadingBooking, get: getBooking, del} = useFetch('http://localhost:3000/api')

    useEffect(() => {
        get(`/events/${idEvent}`)
    }, []);

    useEffect(() => {
        getBooking(`/bookings/${idBooking}`)
    }, []);

    const updateBooking = () => {
        getBooking(`/bookings/${idBooking}`)
        getMethod()
    }

    useEffect(() => {
        if (data) {
            setEvent(data.event);
        }
    }, [data]);

    const handleCancelBooking = () => {
        Swal.fire({
            title: '¿Estás seguro de cancelar tu reservación?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener',
            confirmButtonColor: '#C38EB4',
            cancelButtonColor: '#26425A'
        }).then((result) => {
            if (result.isConfirmed) {
                del(`/bookings/${idBooking}`)
            }
        })
    }

    useEffect(() => {
            if (dataBooking.msg === 'Reserva eliminada') {
                Swal.fire({
                    title: 'Reserva cancelada',
                    text: 'Tu reserva ha sido cancelada',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    setTimeout(() => {
                        updateBooking()
                    }, 1000)
                })
            }
        }
        ,
        []
    )


    return (
        <>
            {
                loading || loadingBooking ? (<Loader/>) : (
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
                            <Button
                                text={dataBooking?.booking?.state ? 'Cancelar Reservación' : 'Reservación cancelada'}
                                onClick={handleCancelBooking}
                                autosize={false}
                                disabled={!dataBooking?.booking?.state}
                            />
                            <span className={styles.numberBooking}>
                                Tu reservación es de {dataBooking?.booking?.numberBooking} personas
                            </span>
                        </div>
                    </>
                )
            }
        </>
    )
}