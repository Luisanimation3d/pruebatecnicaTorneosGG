import {useEffect, useState} from "react";
import styles from "../MyEvents/MyEvents.module.css";
import {EventCard} from "../../components/EventCard/EventCard.tsx";
import {createPortal} from "react-dom";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {Loader} from "../../components/Loader/Loader.tsx";
import {BookingDetailModal} from "../../modals/BookingDetailModal/BookingDetailModal.tsx";

export const MyBookings = () => {
    const {data, get, error, loading} = useFetch('http://localhost:3000/api');

    const [modalOpen, setModalOpen] = useState(false);
    const [eventId, setEventId] = useState<number | null>(null);
    const [bookingId, setBookingId] = useState<number | null>(null);

    useEffect(() => {
        getMethod()
    }, []);

    const getMethod = () => {
        get('/bookings');
    }


    return (
        <>
            <section className={styles.section__my__events}>
                <div className={styles.my__events__cards__container}>
                    {
                        loading ? <Loader/> : error ?
                            <p>Hubo un error</p> : data && data?.bookings?.length ? data.bookings?.map((booking: any) => (
                            <EventCard event={booking.event} key={booking.id} onClick={() => {
                                setEventId(booking.event.id)
                                setBookingId(booking.id)
                                setModalOpen(true)
                            }}
                            cancelled={!booking.state}
                            />
                        )) : (<p className={styles.empty}>No tienes ninguna reserva</p>)
                    }
                </div>
            </section>
            {
                modalOpen &&
                createPortal(
                    <>
                        <ModalContainer setOpenMdal={setModalOpen}>
                            <Modal setOpenModal={setModalOpen}>
                                <BookingDetailModal idEvent={eventId as number} idBooking={bookingId as number} getMethod={()=>{
                                    getMethod()
                                    setModalOpen(false)
                                }}/>
                            </Modal>
                        </ModalContainer>
                    </>
                    ,
                    document.getElementById('modal') as HTMLDivElement
                )
            }
        </>
    )
}