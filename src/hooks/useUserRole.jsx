import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth()
    const axiosInstance = useAxiosSecure()

    const {
        data: role = '',
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user?.email}/role`);
            return res.data.role;
        },
        enabled: !!user?.email && !authLoading, // only run when user is ready
    });
    return { role, refetch, roleLoading: authLoading || isLoading };;
};

export default useUserRole;