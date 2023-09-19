"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import styles from './page.module.scss';
import { updateFormField, submitForm  } from '../../redux/features/formSlice'
import {setConnected, selectIsConnected } from '../../redux/features/userSlice'; 
import {useRouter } from 'next/navigation';
export default function Form() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const isConnected = useAppSelector(selectIsConnected);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const formattedData = {
      email: formData.email,
      password: formData.password,
    }
    dispatch(submitForm(formattedData))
    
    
  };

  return (

    
    <>
      <div className={styles.form}>
        {isConnected ? (
          
          <form onSubmit={handleSubmit}>
            <label>Nickname</label>
            <input
              type="text"
              value={formData.nickname}
              id="nickname"
              name="nickname"
              onChange={handleInputChange}
            />
            <button type="submit">Edit</button>
          </form>
        ):(
          <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={formData.email}
            id="email"
            name="email"
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
        )}
        
      </div>
    </>
  );
}