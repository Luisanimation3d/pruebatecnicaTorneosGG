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
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const EventDetail = () => {

    const {isAuthenticated} = useSelector((state: any) => state.auth)


    const [review, setReview] = useState({
        title: '',
        comment: '',
        qualification: 0
    });

    const [errorForm, setError] = useState({});

    const [event, setEvent] = useState<event | null>(null);
    const [reviewsData, setReviewsData] = useState<any[]>([]);

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

    const {data, error, loading, get, post} = useFetch(`http://localhost:3000/api`)

    const formFields: FormField[] = [
        {
            name: 'title',
            label: 'Título',
            type: 'text',
            value: review.title,
            onChange: (e) => setReview({...review, title: e}),
            size: 'large'
        }, {
            name: 'comment',
            label: 'Descripción',
            type: 'textarea',
            value: review.comment,
            onChange: (e) => setReview({...review, comment: e}),
            size: 4
        }, {
            name: 'qualification',
            label: 'Calificación',
            type: 'number',
            value: review.qualification,
            onChange: (e) => setReview({
                ...review,
                qualification: parseFloat(e) < 0 ? 0 : parseFloat(e) > 5 ? 5 : parseFloat(e)
            }),
            size: 'large'
        }
    ]

    if (!isAuthenticated) {
        localStorage.setItem('lastPath', `/events/${id}`);
    }

    const validate = () => {
        const errors: any = {};
        if (review.title.length === 0) {
            errors.title = 'El título es requerido';
        }
        if (review.comment.length === 0) {
            errors.comment = 'La descripción es requerida';
        }
        if (review.qualification === 0) {
            errors.qualification = 'La calificación es requerida';
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        post('/reviews', {
            title: review.title,
            comment: review.comment,
            qualification: review.qualification,
            event: id
        });
    }


    useEffect(() => {
        get(`/reviews/${id}`)
    }, []);


    useEffect(() => {
        if (data.msg === 'Review creada') {
            setReview({
                title: '',
                comment: '',
                qualification: 0
            });
            get(`/reviews/${id}`)
        } else if (data) {
            setEvent(data.event);
            setReviewsData(data.reviews);
        }
    }, [data]);

    return !isAuthenticated ? (<Navigate to={'/login'}/>) : new Date(event?.date as Date) > new Date ? (
        <h1 className={styles.title__empty}>El evento aún no ha finalizado, vuelve luego</h1>) : (
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
                            <span className={styles.qualification}><Stars count={data.totalQualification}/></span>
                            <p className={styles.event__description}>{event?.description}</p>
                        </div>
                        <div className={styles.reviews__container}>
                            <h2 className={styles.title__section}>Reseñas</h2>
                            {
                                reviewsData?.length === 0 ? (<p className={styles.message__empty}>No hay reseñas</p>) : (
                                    reviewsData?.map((review: any) => (
                                        <ReviewCard key={review.id} review={review}/>
                                    ))
                                )

                            }
                            <Form fields={formFields} onSubmit={handleSubmit} textButton={'Registrar calificación'}
                                  cancelButton={false} errors={errorForm}/>
                        </div>
                    </div>
                )
            }

        </>
    )
}