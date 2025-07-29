import React from 'react';
import { Outlet } from 'react-router';
import Lottie from "lottie-react";
import loginLottie from '../../src/assets/lotties/login.json'
import PulseLink from '../pages/shared/PulseLink';

const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200 md:w-9/12 mx-auto min-h-screen flex">

            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1 left-[1900px]'>
                    <Lottie className='' animationData={loginLottie} loop={true}></Lottie>
                    <img
                        // src={authImg}
                        className="max-w-sm rounded-lg "
                    />
                </div>
                <div className='flex-1'>
                    <div>
                        <PulseLink></PulseLink>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;