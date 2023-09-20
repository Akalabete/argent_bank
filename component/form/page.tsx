"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import styles from './page.module.scss';
import { updateFormField, submitForm  } from '../../redux/features/formSlice'
import { selectIsConnected } from '../../redux/features/userSlice'; 
import { useRouter } from 'next/navigation';
import { setTokenStorageLocation, selectTokenStorageLocation } from "@/redux/features/authSlice";

export default function Form() {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const isConnected = useAppSelector(selectIsConnected);
  const tokenStorageLocation = useAppSelector(selectTokenStorageLocation);
  
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };
  const onChangeCheckBox = () => {
    const newStorageLocation = !tokenStorageLocation
    dispatch(setTokenStorageLocation(newStorageLocation)); 
    
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      email: formData.email,
      password: formData.password,
      tokenStorageLocation: tokenStorageLocation,
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
          <label>Remember me</label>
          <input
            type="checkbox"
            id="secureCookie"
            name="secureCookie"
            onChange= {onChangeCheckBox}
            checked={tokenStorageLocation}
            
            />
          <button type="submit">Submit</button>
        </form>
        )}
        
      </div>
    </>
  );
}