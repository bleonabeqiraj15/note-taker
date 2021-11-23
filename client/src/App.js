/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/dashboard/Views/Login'
import SignUp from './components/dashboard/Views/SignUp';
import Dashboard from './components/dashboard/Views/Dashboard'
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgetPassword from './components/Account/ForgetPassword';
import ResetPassword from './components/Account/ResetPassword';

function App() {

  return (
    <div>
      <Router>
        {/* {
          !isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/create-account">Sign up</Link>
            </>) : (<LogOut />)} */}

        {/* {
          isLoggedIn && (
            <Navbar />
          )
        } */}
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/create-account" component={SignUp} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <ProtectedRoutes path="/dashboard" component={Dashboard} />
          {/* <ProtectedRoutes path="/profile" exact component={Profile} />
          <ProtectedRoutes path="/add-note" exact component={AddNote} />
          <ProtectedRoutes path="/my-notes" exact component={MyNotes} />
          <ProtectedRoutes path="/notes" exact component={Notes} /> */}
          <Route exact path="/">
            <Redirect exact from="/" to="login" />
          </Route>
          <Route exact path="**" component={() => "404 NOT FOUND"} />
        </Switch>
        <ToastContainer autoClose={3000} />
      </Router>
    </div>
  );
}

export default App;
