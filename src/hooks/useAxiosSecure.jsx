import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: `https://pulse-link-server.vercel.app`
})

const useAxiosSecure = () => {
    const { user, logout, loading } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        if (!loading && user?.accessToken) {


            // Add request interceptor
            const requestInterceptor = axiosInstance.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user?.accessToken}`
                return config
            }, error => {
                return Promise.reject(error)
            })


            // Add response interceptor

            const responseInterceptor = axiosInstance.interceptors.response.use(res => {
                return res
            }, error => {

                const status = error.status
                if (status === 403) {
                    navigate('/forbidden')
                }
                else if (status === 401) {
                    logout()
                        .then(() => {
                            navigate('/login')
                        })
                        .catch(error => {
                            console.log(error)
                        })

                }
                return Promise.reject(error)
            })

            // Cleanup to prevent multiple interceptors on re-renders
            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };

        }
    }, [loading, logout, navigate, user?.accessToken])





    return axiosInstance;
};

export default useAxiosSecure;