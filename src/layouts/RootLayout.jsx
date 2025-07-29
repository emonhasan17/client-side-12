import React from 'react';
import Navbar from '../pages/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer';

const RootLayout = () => {
    return (
        <div className='space-y-10'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;