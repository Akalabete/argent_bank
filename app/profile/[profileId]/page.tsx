'use client';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { updateFormField, selectProfileData, updateProfileData } from '@/redux/features/formSlice'
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

export default function Profile( {
    params,
    searchParams,
  }: {
    params: {accountId: string}
    searchParams: { [key: string]: string | string[] | undefined }
  }) {


    const profileData = useAppSelector(selectProfileData);
    const dispatch = useAppDispatch();
    
    const userDataString = sessionStorage.getItem("userData");

    const userData = userDataString? JSON.parse(userDataString): null;
    console.log(userData);
  

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log("++");
      dispatch(updateFormField({ fieldName: name, fieldValue: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(updateProfileData(profileData))
      // + api put 
      
    }
    return(
      <>
        <h2>User informations:</h2>
        <div className={styles.loginWindow}>
        
          <div className={styles.form}>

            <form onSubmit={handleSubmit}>
              <label>Firstname:</label>
              <input
                type="text"
                value={profileData.body.firstName}
                id="firstname"
                name="firstname"
                readOnly
              />
              <label>Lastname</label>
                <input
                  type="text"
                  value={profileData.body.lastName}
                  id="lastname"
                  name="lastname"
                  readOnly
                />
              <label>Email</label>
                <input
                  type="text"
                  value={profileData.body.email}
                  id="email"
                  name="email"
                  readOnly
                />
              <label>Password</label>
                <input
                  type="text"
                  value={userData.password}
                  id="password"
                  name="password"
                  readOnly
                />
              <label>Username</label>
                <input
                  type="text"
                  defaultValue={profileData.body.userName}
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