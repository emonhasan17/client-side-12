import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: `https://pulse-link-server.vercel.app`
})

const useAxios = () => {
    return axiosSecure;
};

export default useAxios;