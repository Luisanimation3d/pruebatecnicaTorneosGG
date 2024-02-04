import {createPortal} from "react-dom";
import {Banner} from "../../components/Banner/Banner.tsx";
import bannerExplorer from "../../assets/images/bannerExplorerPage.jpg";
import {EventCard} from "../../components/EventCard/EventCard.tsx";
import styles from './Explorer.module.css';
import {Modal, ModalContainer} from "../../components/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {event} from "../../types/generaltypes";
import {EventDetailModal} from "../../modals/EventDetailModal/EventDetailModal.tsx";
import {Loader} from "../../components/Loader/Loader.tsx";

export function Explorer() {
    const {data, loading, error, get} = useFetch('http://localhost:3000/api');

    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        get('/events');
    }, []);


    return (
        <>
            <Banner title={'Descubre y Reserva Eventos'} image={bannerExplorer} fullheight={false}/>
            <section className={styles.section__explorer}>
                <h2 className={styles.section__explorer__title}>Eventos Próximos</h2>
                <div className={styles.explorer__cards__container}>
                    {
                        loading ? <Loader/> : error ? <p>Hubo un error</p> :
                            data && data?.events?.length && data?.events[0]?.map((event: event) => (
                                <EventCard event={event} key={event.id} onClick={(id) => {
                                    setId(id)
                                    setModalOpen(true)
                                }}/>
                            ))
                    }
                </div>
            </section>
            {
                modalOpen &&
                createPortal(
                    <>
                        <ModalContainer setOpenMdal={setModalOpen}>
                            <Modal setOpenModal={setModalOpen}>
                                <EventDetailModal id={id as number}/>
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