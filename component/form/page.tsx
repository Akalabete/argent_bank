"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import styles from './page.module.scss';
import { updateFormField } from '@/redux/features/formSlice'
import { setuserCredentialStorageLocation, selectuserCredentialStorageLocation} from "@/redux/features/globalUserSlice";
import { useRouter } from 'next/navigation';
import { setUser } from '@/redux/features/globalUserSlice';
import { openModal, closeModal } from '@/redux/features/modalSlice';
import Modal from '../modal/page';


export default function Form() {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const userCredentialStorageLocation = useAppSelector(selectuserCredentialStorageLocation);
  const userData = JSON.parse(localStorage.getItem('userData') || "{}");
  const router = useRouter();
  const modal = useAppSelector((state: { modal: any; }) => state.modal);
  const handleCloseModal = () => {
    dispatch(closeModal());    
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };

  const onChangeCheckBox = () => {
    localStorage.removeItem("userData");
    const newStorageLocation = !userCredentialStorageLocation
    dispatch(setuserCredentialStorageLocation(newStorageLocation));
  };

  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault();
    const formattedData = {
      email: formData.email,
      password: formData.password,
      userCredentialStorageLocation: userCredentialStorageLocation,
    };

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.status === 200) {
        const data = await response.json();
        const authToken = data.body.token;
        
        if (userCredentialStorageLocation) {
          localStorage.setItem("userData", JSON.stringify(formattedData));
        } else {
          localStorage.removeItem("userData");
        };
      try {
        const profileResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
            method : "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-type": "application/json",
              Accept: "application.json",
            },
            body: JSON.stringify({})
          });
          if (profileResponse.status===200){
            const profileData = await profileResponse.json();
            const customId = profileData.body.id;
            const userName = profileData.body.userName;
            const lastName = profileData.body.lastName;
            const firstName = profileData.body.firstName
            dispatch(setUser({
              authToken: authToken,
              email: formData.email,
              userName: userName,
              lastName: lastName,
              password: formData.password,
              firstName: firstName,
              userId: customId,
              userCredentialStorageLocation: userData.userCredentialStorageLocation,
          }));
          router.push(`/accounts/${customId}`)
          }else {
            console.log("error")
          }
        }
        catch(error){
            console.error(error);
        }
      
      }else if (response.status === 400) {
        dispatch(
          openModal({
            title: "Incorrect credentials",
            message: "Please verify your credentials",
          })
        );
      }
    } catch (error) {
      console.error("error while connecting to server:", error);
    }
  }
  return (
    <>
      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label>Username</label>
          <input
            type="email"
            defaultValue={userData.email}
            value={formData.email}            
            id="email"
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputWrapper}>
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
        <div className={styles.inputRemember}  >
            <input
              type="checkbox"
              id="inputRemember"
              name="inputRemember"
              onChange={onChangeCheckBox}
              checked={userData.userCredentialStorageLocation ?? userCredentialStorageLocation}
            />
            <label 
              htmlFor="inputRemember" 
              style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            Remember me
          </label>
          
        </div>
        <button 
          className={styles.signInButton} 
          type="submit"
          >
          Sign in
        </button>
      </form>
    </>
  );
}