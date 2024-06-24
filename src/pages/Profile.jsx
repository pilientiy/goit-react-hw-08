import { useSelector } from "react-redux";
import { DocumentTitle } from "../components/DocumentTitle";
import { selectUser } from "../redux/auth/selectors";
import styles from './Profile.module.css';

export default function Profile() {
  const user = useSelector(selectUser);

  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <DocumentTitle>Profile</DocumentTitle>

      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.userInfo}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} className={styles.userImage} />}
        </div>
      </div>
    </>
  );
}
