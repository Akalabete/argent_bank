'use client';

import styles from './page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import  Form  from '../../component/form/page'
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { selectIsConnected } from '@/redux/features/userSlice'; 
import { openModal, closeModal } from '../../redux/features/modalSlice';
import Modal from '../../component/modal/page'

    
export default function Login() {

  const isConnected = useAppSelector(selectIsConnected);
  const modal = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(openModal({ title: 'Modal Title', message: 'Modal Message' }));
  };

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
          {isConnected ?(
            <div className={styles.loginWindow}>
              <FontAwesomeIcon 
               size="2x" 
                icon={faCircleUser} 
              />
              <h3>Edit profile</h3>
              <Form />
              
            </div>
          ):(
            <div className={styles.loginWindow}>
              <FontAwesomeIcon 
                size="2x" 
                icon={faCircleUser} 
              />
              <h3>Sign in</h3>
              <Form />
              </div>
             )}
          
          
        
    </section>
 
    
  )
}
