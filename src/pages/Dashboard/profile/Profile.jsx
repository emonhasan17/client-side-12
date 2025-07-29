import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

const Profile = () => {

    const axiosInstance = useAxiosSecure()
    const { user } = useAuth()

    const { data: users, isLoading, isError } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    console.log(users)

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Failed to load profile.</div>


    return (
        <div className="max-w-8/12 mx-auto mt-10 bg-base-200 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-6">
                <img
                    src={users?.avatar || 'https://i.ibb.co/2nL6g7T/avatar.png'}
                    alt="avatar"
                    className="w-24 h-24 rounded-full mb-2"
                />
                <h2 className="text-2xl font-bold">{users?.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{users?.role}</p>
                <span className={`badge mt-2 ${users.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {user.status}
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{users?.email}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Blood Group</p>
                    <p className="font-medium">{users?.bloodGroup}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">District</p>
                    <p className="font-medium">{users?.district}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Upazila</p>
                    <p className="font-medium">{users?.upazila}</p>
                </div>
                <div>
                    <Link to='/dashboard/editProfile' className='btn btn-success'>Edit Profile</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;