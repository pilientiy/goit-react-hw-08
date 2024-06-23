import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import style from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={style.nav}>
      <NavLink className={style.link} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={style.link} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;