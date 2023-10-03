'use client';
import {  updateRegistrationFormField } from '@/redux/features/formSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook';  
import styles from './page.module.scss';

export default function RegistrationForm() {
  const registrationForm = useAppSelector((state) => state.form.registrationData);
  const dispatch = useAppDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateRegistrationFormField({ fieldName: name, fieldValue: value }));
  };
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const registrationFormData = {
      "email" : registrationForm.email,
      "password" : registrationForm.password,
      "firstName": registrationForm.firstname,
      "lastName": registrationForm.lastname,
      "userName": registrationForm.username,
    };
    console.log(registrationFormData)
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept":"application/json"
        },
        body: JSON.stringify({registrationFormData}),
      });
      if(response.status === 200) {
        dispatch(updateRegistrationFormField({ fieldName: "firstName", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "lastName", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "email", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "password", fieldValue: "" }));
        dispatch(updateRegistrationFormField({ fieldName: "userName", fieldValue: "" }));
        console.log("cheer");
      }

    } catch(error){

    }
  }
  return(
    <>
    <h2>Please fill the registration form below:</h2>
    <div className={styles.loginWindow}>
      
    <div className={styles.form}>
    <form>
      <label>Email: </label>
      <input 
        type="text"
        name="email"
        id="email"
        value={registrationForm.email}
        placeholder="Your email here"
        onChange={handleInputChange}
        />
      <label>Password</label>
      <input
        type="text"
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
 