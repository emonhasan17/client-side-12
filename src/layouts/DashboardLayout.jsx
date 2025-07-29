import React from 'react';
import { NavLink, Outlet } from 'react-router';
import useUserRole from '../hooks/useUserRole';
import PulseLink from '../pages/shared/PulseLink';

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole()

    const links = <>

        <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? '' : ''}>Home</NavLink></li>
        <li><NavLink to='/dashboard/profile' className={({ isActive }) => isActive ? 'bg-green-100 text-black border-l-4 border-green-600' : ''}>Profile</NavLink></li>

        
        {
            (!roleLoading && role === 'donor') && <>
                
                <li><NavLink to='/dashboard/createDonationReq' className={({ isActive }) => isActive ? 'bg-green-100 text-black border-l-4 border-green-600' : ''}>Create Donation Request</NavLink></li>
                <li><NavLink to='/dashboard/myDonationReq' className={({ isActive }) => isActive ? 'bg-green-100 text-black border-l-4 border-green-600' : ''}>My Donation Requests</NavLink></li>
            </>
        }

        {
            (!roleLoading && role === 'admin') && <>
                <li><NavLink to='/dashboard/allUsers' className={({ isActive }) => isActive ? 'bg-green-100 text-black border-l-4 border-green-600' : ''}>All Users</NavLink></li>
            </>
        }

        {
          (!roleLoading && (role === 'admin' || role === 'volunteer'))  &&  <>
          <li><NavLink to='/dashboard/allBloodDonationReq' className={({ isActive }) => isActive ? 'bg-green-100 text-black border-l-4 border-green-600' : ''}>All Blood Donation Request</NavLink></li>
                <li><NavLink to='/dashboard/contentManagement' className={({ isActive }) => isActive ? 'bg-green-100 text-black border-l-4 border-green-600' : ''}>Content Management</NavLink></li>
           
          </> 
        }

    </>


    return (
        <div className="drawer w-full lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300  w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* Page content here */}
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <PulseLink></PulseLink>
                    <div className='text-2xl mt-10 space-y-6'>
                    {
                        links
                    }
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;