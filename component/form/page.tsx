"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import styles from './page.module.scss';
import { updateFormField, submitForm  } from '../../redux/features/formSlice'
import { setTokenStorageLocation, selectTokenStorageLocation } from "@/redux/features/authSlice";

export default function Form() {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);
  const tokenStorageLocation = useAppSelector(selectTokenStorageLocation);
  const userData = JSON.parse(localStorage.getItem('userData') || "{}");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ fieldName: name, fieldValue: value }));
  };

  const onChangeCheckBox = () => {
    sessionStorage.removeItem("userData");
    localStorage.removeItem("userData");
    const newStorageLocation = !tokenStorageLocation
    dispatch(setTokenStorageLocation(newStorageLocation));
    console.log("clicked");
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
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
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
          value={formData.password}
          defaultValue={userData.password}
          id="password"
          name="password"
          onChange={handleInputChange}
        />
        <label>Remember me</label>
        <input
          type="checkbox"
          id="secureCookie"
          name="secureCookie"
          onChange={onChangeCheckBox}
          checked={userData.tokenStorageLocation ?? tokenStorageLocation}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
