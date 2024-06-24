import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layaut";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selector";

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser())
  },[dispatch])
  return isRefreshingUser ?
    (<div>REFRESHING USER...</div>) : (
    <React.Fragment>
      <CssBaseline/>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RestrictedRoute component={<RegisterPage/>} redirectTo='/'/>} />
            <Route path="/login" element={<RestrictedRoute component={<LoginPage/>} redirectTo='/contacts'/>} />
            <Route path="/contacts" element={<PrivateRoute component={<ContactsPage/>} redirectTo='/login' />} />
          </Routes>
        </Suspense>
      </Layout>
</React.Fragment>
  );
}

