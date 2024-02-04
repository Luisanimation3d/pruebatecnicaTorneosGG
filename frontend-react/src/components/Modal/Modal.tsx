import React from "react";
import styles from './Modal.module.css';
import {FiX} from "react-icons/fi";

export function ModalContainer ({children, setOpenMdal}: {children: React.ReactNode, setOpenMdal: (open: boolean) => void}) {

    return (
        <div className={`${styles.modal__container}`} onClick={()=> setOpenMdal(false)}>
            {children}
        </div>
    )
}

export function Modal({children, setOpenModal}: {children: React.ReactNode, setOpenModal: (open: boolean) => void}) {

    const [closing, setClosing] = React.useState(false);

    return (
        <div className={`${styles.modal} ${closing ? styles.isClosing : ''}`} onClick={e => e.stopPropagation()}>
            <button className={styles.button__close__modal} onClick={() => {
                setClosing(true);
                setTimeout(() => setOpenModal(false), 300);
            }}><FiX/></button>
            {children}
        </div>
    )
}