"use client";
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import styles from './page.module.scss';
import { updateFormField, submitForm, updateProfileData  } from '@/redux/features/formSlice'
import { setuserCredentialStorageLocation, selectuserCredentialStorageLocation, updateAuthToken } from "@/redux/features/authSlice";
import { useRouter } from 'next/navigation';
import { selectAuthToken } from '@/redux/features/authSlice'

export default function Form() {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const userCredentialStorageLocation = useAppSelector(selectuserCredentialStorageLocation);
  const userData = JSON.parse(localStorage.getItem('userData') || "{}");
  const router = useRouter();
  const authToken = useAppSelector(selectAuthToken)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };

  const onChangeCheckBox = () => {
    sessionStorage.removeItem("userData");
    localStorage.removeItem("userData");
    const newStorageLocation = !userCredentialStorageLocation
    dispatch(setuserCredentialStorageLocation(newStorageLocation));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      email: formData.email,
      password: formData.password,
      userCredentialStorageLocation: userCredentialStorageLocation,
    };
  
    try {
      const response = await dispatch(submitForm(formattedData));
  
      if (response.meta.requestStatus === 'fulfilled') {
        
        
        console.log(authToken,"666")
        const userData = { email: formData.email, password: formData.password, authToken, userCredentialStorageLocation };
  
        if (userCredentialStorageLocation) {
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        sessionStorage.setItem("userData", JSON.stringify(userData));
        
        const profileDataStored = sessionStorage.getItem("profile");
        if (profileDataStored) {
          const profileData = JSON.parse(profileDataStored);
          const customId = profileData.body.id;
          dispatch(updateProfileData(profileData));
          router.push(`/accounts/${customId}`);
        } else {
          console.log("Profile data not found in sessionStorage");
        }
      }
    } catch (error) {
      console.error("error while connecting to server:", error);
    }
  };
  
  return (
    <div className={styles.form}>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formBold}>
          <label>Username</label>
          <input
            type="email"
            defaultValue={userData.email}
            value={formData.email}            
            id="email"
            name="email"
            onChange={handleInputChange}
          />
          <label>Password</label>
          <input
            type="password"
            defaultValue={userData.email}
            value={formData.password}
            id="password"
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.secureCookie}  >
            <input
              type="checkbox"
              id="secureCookie"
              name="secureCookie"
              onChange={onChangeCheckBox}
              checked={userData.userCredentialStorageLocation ?? userCredentialStorageLocation}
            />
            <label htmlFor="secureCookie" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            Remember me
          </label>
          
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}