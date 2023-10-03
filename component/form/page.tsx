"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import styles from './page.module.scss';
import { updateFormField, submitForm, updateProfileData  } from '@/redux/features/formSlice'
import { setTokenStorageLocation, selectTokenStorageLocation } from "@/redux/features/authSlice";
import { useRouter } from 'next/navigation';


export default function Form() {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const tokenStorageLocation = useAppSelector(selectTokenStorageLocation);
  const userData = JSON.parse(localStorage.getItem('userData') || "{}");
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };

  const onChangeCheckBox = () => {
    sessionStorage.removeItem("userData");
    localStorage.removeItem("userData");
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

    const profileDataStored = sessionStorage.getItem("profile");
    if (profileDataStored) {
    const profileData = JSON.parse(profileDataStored);
    const customId = profileData.body.id;
    dispatch(updateProfileData(profileData));
    router.push(`/accounts/${customId}`)
  } else {
    console.log("Profile data not found in sessionStorage");
  }
  };
  
  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
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
        <div>
          <div className={styles.secureCookie}  >
            <input
              type="checkbox"
              id="secureCookie"
              name="secureCookie"
              onChange={onChangeCheckBox}
              checked={userData.tokenStorageLocation ?? tokenStorageLocation}
            />
          </div>
          <label htmlFor="secureCookie" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            Remember me
          </label>
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
 
