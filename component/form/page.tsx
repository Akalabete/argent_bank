'use.client'

import { useAppDispatch, useAppSelector } from "@/redux/hook"; // Assurez-vous que le chemin est correct
import styles from './page.module.scss';
import { RootState } from '../../redux/store';


export default function Form() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state: RootState) => state.form);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FORM_FIELD', fieldName: name, fieldValue: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            id="username"
            name="username"
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
      </div>
    </>
  );
}