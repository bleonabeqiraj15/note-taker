import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const ProtectedRoutes = ({ component: Component, ...rest }) => {

    const isAuthenticated = localStorage.getItem("token");
    var loggedIn = false;
    if (isAuthenticated) {
        // console.log("this", isAuthenticated);
        const jwt_token = jwt_decode(isAuthenticated);
        loggedIn = +new Date(+jwt_token.expiresIn * 1000) > +new Date();
        // console.log(jwt_token, "token decode", +new Date(+jwt_token.expiresIn * 1000), +new Date())
        // loggedIn = true;
        if (!loggedIn) localStorage.removeItem("token");
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                loggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
}

export default ProtectedRoutes

