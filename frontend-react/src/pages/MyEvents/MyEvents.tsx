import {useEffect, useState} from "react";
import styles from "./MyEvents.module.css";
import {EventCard} from "../../components/EventCard/EventCard.tsx";
import {createPortal} from "react-dom";
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useFetch} from "../../hooks/useFetch.ts";
import {event} from "../../types/generaltypes";
import {Loader} from "../../components/Loader/Loader.tsx";
import {EventDetailModal} from "../../modals/EventDetailModal/EventDetailModal.tsx";

export const MyEvents = () => {
    const {data, get, error, loading} = useFetch('http://localhost:3000/api');

    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        get('/events/user/1');
    }, []);


    return (
        <>
            <section className={styles.section__my__events}>
                <div className={styles.my__events__cards__container}>
                    {
                        loading ? <Loader/> : error ?
                            <p>Hubo un error</p> : data && data?.events?.length ? data.events?.map((event: event) => (
                            <EventCard event={event} key={event.id} onClick={() => {
                                setId(event.id)
                                setModalOpen(true)
                            }}/>
                        )): (<p className={styles.empty}>No tienes ningún evento</p>)
                    }
                </div>
            </section>
            {
                modalOpen &&
                createPortal(
                    <>
                        <ModalContainer setOpenMdal={setModalOpen}>
                            <Modal setOpenModal={setModalOpen}>
                                <EventDetailModal id={id as number} owner={true}/>
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