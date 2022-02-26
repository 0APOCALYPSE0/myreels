// import React,{useContext} from 'react';
// import { Navigate } from 'react-router-dom';
// import {Route} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import React,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({element:Component,...rest}) {
    const {users} = useContext(AuthContext) 
    console.log(users)
    return (
        users ? <Outlet />:<Navigate to="/login" />
    )
}

export default PrivateRoute

