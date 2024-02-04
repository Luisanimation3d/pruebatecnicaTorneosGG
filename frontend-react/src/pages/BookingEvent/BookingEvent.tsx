import {Loader} from "../../components/Loader/Loader.tsx";
import styles from "./BookingEvent.module.css";
import moment from "moment"
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch.ts";
import {event} from "../../types/generaltypes";
import {Form} from "../../components/Form/Form.tsx";
import {FormField} from "../../types/formTypes";
import Swal from "sweetalert2";

export const BookingEvent = () => {

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

    const {id} = useParams();

    const [event, setEvent] = useState<event | null>(null);


    const {data, error, loading, get, post} = useFetch(`http://localhost:3000/api`);

    const [errorForm, setErrorForm] = useState<{ [key: string]: string }>({});
    const [bookingForm, setBookingForm] = useState({
        assistants: 0
    });

    const formFields: FormField[] = [
        {
            name: 'assistants',
            label: 'Número de asistentes',
            type: 'number',
            value: bookingForm.assistants,
            onChange: (e: string) => {
                if (event?.number_assistants && event?.number_assistants < parseInt(e)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `No puedes reservar más de ${event?.number_assistants} asistentes`,
                        showConfirmButton: true,
                        confirmButtonColor: '#C38EB4'
                    })
                } else {
                    setBookingForm({...bookingForm, assistants: parseInt(e) < 0 ? 0 : parseInt(e)});
                }
            },
            size: 'large'
        }
    ]

    const validationForm = () => {
        const errors: { [key: string]: string } = {};
        if (bookingForm.assistants === 0) {
            errors.assistants = 'El número de asistentes debe ser mayor a 0';
        }
        if(event?.number_assistants && event?.number_assistants < bookingForm.assistants){
            errors.assistants = `No puedes reservar más de ${event?.number_assistants} asistentes`;
        }
        setErrorForm(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validationForm()) return;
        post(`/bookings`, {numberBooking: bookingForm.assistants, event: id});
    }

    useEffect(() => {
        get(`/events/${id}`)
    }, []);

    useEffect(() => {
        if (data.event) {
            setEvent(data.event);
        }else if(data.msg){
        //     Informar del exito en la reserva y redirigir a /explorer
            Swal.fire({
                icon: 'success',
                title: 'Reserva exitosa',
                text: 'Tu reserva ha sido exitosa',
                showConfirmButton: true,
                confirmButtonColor: '#C38EB4'
            }).then(() => {
                navigate('/explorer');
            });
        }
    }, [data]);

    return (
        <>
            {
                loading ? (<Loader/>) : !error && (
                    <div className={styles.container}>
                        <div className={styles.image__container}>
                            <img
                                src={`http://localhost:3000/api/events/image/${event?.image}`}
                                alt="event"/>
                        </div>
                        <div className={styles.content__container}>
                            <h1 className={styles.event__title}>{event?.name}</h1>
                            <p className={styles.event__date}>{moment(event?.date).format('dddd DD [de] MMMM [de] YYYY')}</p>
                            <p className={styles.event__description}>{event?.description}</p>
                            <div className={styles.form__container}>
                                <Form fields={formFields} onSubmit={handleSubmit} title={'Reserva tu lugar'} errors={errorForm}/>
                                <span className={styles.places__aviables} style={{
                                    color: event?.number_assistants === 0 ? 'red' : event?.number_assistants && event.number_assistants < 10 ? '#ae455b' : '#86A8CF'
                                }}>Quedan {event?.number_assistants} lugares disponibles</span>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
}