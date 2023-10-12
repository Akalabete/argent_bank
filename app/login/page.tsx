'use client';

import styles from './page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import  Form  from '../../component/form/page'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { openModal, closeModal } from '../../redux/features/modalSlice';
import Modal from '../../component/modal/page'

    
export default function Login() {

  
  const dispatch = useAppDispatch();
  
  const modal = useAppSelector((state: { modal: any; }) => state.modal);
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (

    <section className={styles.loginBackground}>
      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}   
      <div className={styles.loginWindow}>
        <FontAwesomeIcon 
          size="2x" 
          icon={faCircleUser} 
        />
        <h3>Sign in</h3>
        <Form />
        </div>
    </section>
  )
}
