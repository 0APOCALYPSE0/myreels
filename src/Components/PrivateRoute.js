// import React,{useContext} from 'react';
// import { Navigate } from 'react-router-dom';
// import {Route} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import React,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({element:Component,...rest}) {
    const {user} = useContext(AuthContext);
    return (
        user.isLoggedIn ? <Outlet />:<Navigate to="/login" />
    )
}

export default PrivateRoute

