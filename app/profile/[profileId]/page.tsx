'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { selectGlobalUser, setUser } from '@/redux/features/globalUserSlice'
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { openModal, closeModal } from "@/redux/features//modalSlice";
import Modal from '../../../component/modal/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'


export default function Profile( {
    params,
    
  }: {
    params: {profileId: string}
    
  }) {
    const userData = useAppSelector(selectGlobalUser);
    const dispatch = useAppDispatch();
    const oldUserName = userData.userName;
    const { profileId } = params;
    const router = useRouter()
    
    const [inputValue, setInputValue] = useState(oldUserName);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value)
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(userData.authToken === null) {
        console.error('missing authentification token');
        return;
      }
      if (inputValue !== oldUserName && inputValue !== "") {
        try {
          const profileUpdateResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
            method : "PUT",
            headers: {
              Authorization: `Bearer ${userData.authToken}`,
              "Content-type": "application/json",
              Accept: "application.json",
            },
            body: JSON.stringify({userName: inputValue })
          });
  
          if (profileUpdateResponse.status===200){
            const updatedProfileData = await profileUpdateResponse.json();
            console.log(updatedProfileData)
            dispatch(setUser({
              authToken: userData.authToken,
              email: userData.email,
              userName: updatedProfileData.body.userName,
              lastName: userData.lastName,
              password: userData.password,
              firstName: userData.firstName,
              userId: userData.userId,
          }));
            dispatch(
              openModal({
                title: "Success!",
                message: "Profile updated successfully.",
                
              }))
          }else {
            console.log("error")
          }
        }
        catch(error){
            console.error(error);
        }

      } else if (inputValue === userData.userName){
        dispatch(openModal({
          title:"Error!",
          message:"Please enter a différent username"
        }))

      } else {
        dispatch(openModal({
          title: "Error!",
          message: "Please enter a username"
        }))
      }
      
    }
    const modal = useAppSelector((state: { modal: any; }) => state.modal);
    const handleCloseModal = (profileId:string) => {
      
      if (modal.title ===  "Success!"){
        dispatch(closeModal())
          router.push(`/accounts/${profileId}`)
      } else {
        dispatch(closeModal());
      }
      
    };
    if ( userData.authToken !== null) {
    return(
      <>
        <h2>User informations:</h2>
        <div className={styles.loginWindow}>
        
        {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          onClose={() => handleCloseModal(profileId)}
        />
      )}   
          <div className={styles.form}>
          <FontAwesomeIcon 
          size="2x" 
          icon={faCircleUser} 
        />
            <form onSubmit={handleSubmit}>
              <label>Firstname:</label>
              <input
                className={styles.greyedInput}
                type="text"
                value={userData.firstName}
                id="firstname"
                name="firstname"
                readOnly
              />
              <label>Lastname</label>
                <input
                  className={styles.greyedInput}
                  type="text"
                  value={userData.lastName}
                  id="lastname"
                  name="lastname"
                  readOnly
                />
              <label>Email</label>
                <input
                  className={styles.greyedInput}
                  type="text"
                  value={userData.email}
                  id="email"
                  name="email"
                  readOnly
                />
              <label>Password</label>
                <input
                  className={styles.greyedInput}
                  type="password"
                  value={userData.password}
                  id="password"
                  name="password"
                  readOnly
                />
              <label>Username</label>
                <input
                  type="text"
                  value={inputValue}
                  id="username"
                  name="username"
                  onChange={handleInputChange}
                />
              <button type="submit">Edit Profile</button>
            </form>
          </div>
        </div>
      </>
    )}
    else {router.push('/');}
  }