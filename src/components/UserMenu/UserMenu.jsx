import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import style from "./UserMenu.module.css";


const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  return (
    <div className={style.container}>
      <p className={style.welcome}>Welcome, {name}</p>
      <button
        className={style.button}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Log Out
      </button>
    </div>
  );
};
export default UserMenu;
