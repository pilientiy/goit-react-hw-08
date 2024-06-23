import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import { FaPhoneSquareAlt } from "react-icons/fa";
import style from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div className={style.container}>
        <h1 className={style.title}>
          <FaPhoneSquareAlt className={style.icon} />
          Welcome to your phone book!
        </h1>
      </div>
    </>
  );
};

export default HomePage;
