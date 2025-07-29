import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const DonorRoute = ({children}) => {
    const { user, loading } = useAuth()
    const { role, roleLoading } = useUserRole()
    const location = useLocation()

    if(loading || roleLoading){
        return <span className="loading loading-dots loading-xl"></span>
    }

    if(!user || role !== 'donor'){
        return <Navigate to='/forbidden' state={location.pathname}></Navigate>
    }
    return children;
};

export default DonorRoute;