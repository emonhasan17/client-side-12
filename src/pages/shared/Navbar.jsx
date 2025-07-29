
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import PulseLink from './PulseLink';

const Navbar = () => {

    const { user, logout } = useAuth()


    const links = <>
        <li><NavLink to='/' className={({ isActive }) => isActive ? 'underline underline-offset-8 text-green-500' : ''}>Home</NavLink></li>
        <li><NavLink to='/bloodDonationReq' className={({ isActive }) => isActive ? 'underline underline-offset-8' : ''}>Blood Donation requests</NavLink></li>
        <li><NavLink to='/blog' className={({ isActive }) => isActive ? 'underline underline-offset-8' : ''}>Blog</NavLink></li>
    </>

    const handleSignOut = () => {
        logout()
            .then(() => {
                console.log('sign out user')
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>
            <div className="navbar bg-base-100 py-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {links}


                        </ul>
                    </div>
                    <PulseLink></PulseLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl">


                        {links}


                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1"><img className='w-10 md:w-12 rounded-full' src={user.photoURL} alt="" /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><button onClick={handleSignOut}>Logout</button></li>
                            </ul>
                        </div>
                            :
                            <div className='flex gap-4'>
                                <Link to='/login' className='btn'>Login</Link>
                                <Link to='/register' className='btn'>Register</Link>
                            </div>
                    }
                    {/* <div className='flex gap-4'>
                        <Link to='/login' className='btn'>Login</Link>
                        <Link to='/signUp' className='btn'>Sign Up</Link>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default Navbar;