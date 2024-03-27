import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavbarComponent from '../NavbarComponent';

function ProtectedRoutes() {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <NavbarComponent />
            <Outlet />
        </>
    )
}

export default ProtectedRoutes;