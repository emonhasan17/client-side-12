import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import DonorHomeComponent from './DonorHomeComponent';
import useUserRole from '../../../hooks/useUserRole';
import AdminHomeComponent from './AdminHomeComponent';

const DashboardHome = () => {
    const { user } = useAuth()


    const { role } = useUserRole()






    return (

        <div className="max-w-11/12 mx-auto mt-6 p-6 bg-base-200 rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-bold text-primary">
                Welcome, {user?.displayName || "Donor"}! 👋
            </h1>
            <p className="mt-2 text-base text-gray-600">
                We're glad to have you back. Check your donation requests, manage your profile, and continue making a difference.
            </p>


            {
                role === 'donor' && <DonorHomeComponent></DonorHomeComponent>
            }

            {
                (role === 'admin' || role === 'volunteer') && <AdminHomeComponent></AdminHomeComponent>
            }



        </div>
    );
};

export default DashboardHome;