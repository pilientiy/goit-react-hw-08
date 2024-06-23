import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import Loading from "../Loading/Loading";
import style from "./Layout.module.css"; 

const Layout = ({ children }) => {
  return (
    <div className={style.layout}>
      <AppBar />
      <Suspense fallback={<Loading />}>
        <div className={style.content}>{children}</div>
      </Suspense>
    </div>
  );
};

export default Layout;
