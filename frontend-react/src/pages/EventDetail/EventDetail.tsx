import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch.ts";
import React, {useEffect, useState} from "react";
import {event} from "../../types/generaltypes";
import styles from './EventDetail.module.css';
import moment from "moment/moment";
import {Loader} from "../../components/Loader/Loader.tsx";
import {ReviewCard} from "../../components/ReviewCard/ReviewCard.tsx";
import {Stars} from "../../components/Stars/Stars.tsx";
import {Form} from "../../components/Form/Form.tsx";
import {FormField} from "../../types/formTypes";

export const EventDetail = () => {

    const [review, setReview] = useState({
        title: '',
        description: '',
        qualification: 0
    });

    const [errorForm, setError] = useState({});

    const [event, setEvent] = useState<event | null>(null);

    moment.locale('es', {
        months: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],
        weekdays: [
            "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
        ]
    });

    const {id} = useParams();

    const {data, error, loading, get} = useFetch(`http://localhost:3000/api`)

    const formFields: FormField[] = [
        {
            name: 'title',
            label: 'Título',
            type: 'text',
            value: review.title,
            onChange: (e) => setReview({...review, title: e}),
            size: 'large'
        }, {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            value: review.description,
            onChange: (e) => setReview({...review, description: e}),
            size: 4
        }, {
            name: 'qualification',
            label: 'Calificación',
            type: 'number',
            value: review.qualification,
            onChange: (e) => setReview({...review, qualification: parseFloat(e) < 0 ? 0 : parseFloat(e) > 5 ? 5 : parseFloat(e)}),
            size: 'large'
        }
    ]

    const validate = () => {
        const errors: any = {};
        if (review.title.length === 0) {
            errors.title = 'El título es requerido';
        }
        if (review.description.length === 0) {
            errors.description = 'La descripción es requerida';
        }
        if (review.qualification === 0) {
            errors.qualification = 'La calificación es requerida';
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!validate()) return;

        console.log(review);
    }


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
                            <span className={styles.qualification}><Stars count={3.5}/></span>
                            <p className={styles.event__description}>{event?.description}</p>
                        </div>
                        <div className={styles.reviews__container}>
                            <h2>Reseñas</h2>
                            <ReviewCard/>
                            <Form fields={formFields} onSubmit={handleSubmit} textButton={'Registrar calificación'} cancelButton={false} errors={errorForm}/>
                        </div>
                    </div>
                )
            }

        </>
    )
}