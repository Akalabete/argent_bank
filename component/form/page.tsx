"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook"; // Assurez-vous que le chemin est correct
import styles from './page.module.scss';
import { updateFormField  } from '../../redux/features/formSlice'
import {setConnected } from '../../redux/features/userSlice'; 

export default function Form() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    /* si formData.username est dans listUser est si formData.password ===e listUser.username.password) {
      alors générer jsw token et passer prop en logged in et pointer sur account{username};
    } sinon {popup "incorrect credentials, try again"}*/
    dispatch(setConnected(true));
  };

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            id="username"
            name="username"
            onChange={handleInputChange}
          />
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            id="password"
            name="password"
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}