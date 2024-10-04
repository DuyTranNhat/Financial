import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';

type Props = {
    children: React.ReactNode
};

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();

    const { isLoggedIn, isReady } = useAuth()
    

    return (isLoggedIn() && isReady) ? (
        <>{children}</>
        
    ) : <Navigate to="/login" state={{ from : location }} replace ></Navigate>
}

export default ProtectedRoute
