'use client'

import styles from './page.module.scss';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose: () => void;
}
export default function Modal({isOpen, title, message, onClose}:ModalProps){

    if (!isOpen) {
        return null;
    }
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{title}</h2>
                <p>{message}</p>
                <button className={styles.button} onClick={onClose}>Ok !</button>
            </div>
        </div>
    )
}