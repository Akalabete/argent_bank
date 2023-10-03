'use client';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { updateFormField, selectProfileData, updateProfileData } from '@/redux/features/formSlice'
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { openModal, closeModal } from "@/redux/features//modalSlice";
import Modal from '../../../component/modal/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function Profile( {
    params,
    
  }: {
    params: {accountId: string}
    
  }) {


    const profileData = useAppSelector(selectProfileData);
    const dispatch = useAppDispatch();
    
    const userDataString = sessionStorage.getItem("userData");

    const userData = userDataString? JSON.parse(userDataString): null;
    const { accountId } = params;
    const router = useRouter()
    let inputValue = "";

    
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
          console.log(updatedProfileData);
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
    }
    const modal = useAppSelector((state: { modal: any; }) => state.modal);
   

    const handleOpenModal = () => {
      dispatch(openModal({ title: 'Modal Title', message: 'Modal Message' }));
    };

    const handleCloseModal = () => {
      dispatch(closeModal());
      router.push(`/accounts/${accountId}`)
    };
    return(
      <>
        <h2>User informations:</h2>
        <div className={styles.loginWindow}>
        
        {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          message={modal.message}
          onClose={handleCloseModal}
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
    )
  }