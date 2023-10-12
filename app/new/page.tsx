'use client';
import { useRouter } from 'next/navigation';
import {  updateRegistrationFormField } from '@/redux/features/formSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook';  
import styles from './page.module.scss';
import { openModal, closeModal } from '../../redux/features/modalSlice';
import Modal from '../../component/modal/page'
import { setConnected } from "../../redux/features/userSlice";

export default function RegistrationForm() {
  const registrationForm = useAppSelector((state) => state.form.registrationData);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const modal = useAppSelector((state: { modal: any; }) => state.modal);
    const handleCloseModal = () => {
      dispatch(closeModal());
      router.push(`/`)
    };
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateRegistrationFormField({ fieldName: name, fieldValue: value }));
  };
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUserResponse = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept":"application/json"
        },
        body: JSON.stringify({
          "email" : registrationForm.email,
          "password" : registrationForm.password,
          "firstName": registrationForm.firstname,
          "lastName": registrationForm.lastname,
          "userName": registrationForm.username,
        }),
      });
      if(newUserResponse.status === 200) {
        dispatch(updateRegistrationFormField({ fieldName: "firstname", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "lastname", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "email", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "password", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "username", fieldValue: "" }));
        console.log("cheer");
        dispatch(setConnected(true));
        //const profileData = await newUserResponse.json();
        //const customId = profileData.body.id;
        //sessionStorage.setItem("profile", JSON.stringify(profileData));
        dispatch(
          openModal({
            title: "Success",
            message: "User successfully registered",
          })
        );
        }
      } catch(error){
    }
  }
  
  return(
    <>
    {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}   
    <h2>Please fill the registration form below:</h2>
    <div className={styles.loginWindow}>
      
    <div className={styles.form}>
    <form>
      <label>Email: </label>
      <input 
        type="email"
        name="email"
        id="email"
        value={registrationForm.email}
        placeholder="Your email here"
        onChange={handleInputChange}
        />
      <label>Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={registrationForm.password}
        placeholder="Your password here"
        onChange={handleInputChange}
        />
      <label>First name: </label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        value={registrationForm.firstname}
        placeholder="Your first name here"
        onChange={handleInputChange}
        />
      <label>Last name: </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        value={registrationForm.lastname}
        placeholder="Your last name here"
        onChange={handleInputChange}
        />
      
      <label>User name: </label>
      <input 
        type="text"
        name="username"
        id="username"
        value={registrationForm.username}
        placeholder="Your username here"
        onChange={handleInputChange}
        />
      
      <button type="submit" className={styles.registrationFormSubmit} onClick={handleRegistrationSubmit}>Sign in !</button>
    </form>
    </div>
    </div>
    </>
  )
}
 