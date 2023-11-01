'use client';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { updateFormField, selectProfileData, updateProfileData } from '@/redux/features/formSlice'
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { openModal, closeModal } from "@/redux/features//modalSlice";
import Modal from '../../../component/modal/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { cp } from 'fs';

export default function Profile( {
    params,
    
  }: {
    params: {profileId: string}
    
  }) {
    console.log('params:', params);

    const profileData = useAppSelector(selectProfileData);
    const dispatch = useAppDispatch();
    
    const userDataString = sessionStorage.getItem("userData");

    const userData = userDataString? JSON.parse(userDataString): null;
    const { profileId } = params;
    const router = useRouter()
    let inputValue = "";
    console.log(profileId);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      inputValue = value
      dispatch(updateFormField({ fieldName: name, fieldValue: value }));
      
    };

    const handleSubmit = async (e: React.FormEvent) => {
      
      e.preventDefault();
      
      const authToken = userData?.authToken
      if(!authToken){
        console.error('missing authentification token');
        return;
      }
      if (inputValue !== profileData.body.userName && inputValue !== "") {
        try {
          const profileUpdateResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
            method : "PUT",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-type": "application/json",
              Accept: "application.json",
            },
            body: JSON.stringify({userName: inputValue })
          });
  
          if (profileUpdateResponse.status===200){
            
            const updatedProfileData = await profileUpdateResponse.json();
            sessionStorage.setItem("profile", JSON.stringify(updatedProfileData));
            dispatch(updateProfileData(updatedProfileData));
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

      } else if (inputValue === profileData.body.userName){
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
    if ( profileData !== null) {
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
                value={profileData.body.firstName}
                id="firstname"
                name="firstname"
                readOnly
              />
              <label>Lastname</label>
                <input
                  className={styles.greyedInput}
                  type="text"
                  value={profileData.body.lastName}
                  id="lastname"
                  name="lastname"
                  readOnly
                />
              <label>Email</label>
                <input
                  className={styles.greyedInput}
                  type="text"
                  value={profileData.body.email}
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
                  defaultValue={profileData.body.userName}
                  value={profileData.userName}
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