import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/contacts" component={RegistrationPage} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/contacts" component={LoginPage} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={ContactsPage} />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
