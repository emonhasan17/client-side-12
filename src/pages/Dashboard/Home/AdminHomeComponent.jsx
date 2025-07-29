import Lottie from 'lottie-react';
import React from 'react';
import CountUp from 'react-countup';
import donorLottie from '../../../assets/lotties/donor.json'
import userLottie from '../../../assets/lotties/blood donner.json'
import handLottie from '../../../assets/lotties/giving-hand.json'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminHomeComponent = () => {

    const axiosInstance = useAxiosSecure()

    const {data: user} = useQuery({
        queryKey: ['donorData'],
        queryFn: async ()=>{
            const res = await axiosInstance.get('/dashboard/home')
            return res.data
        }
    })


    return (
        <div>
            {/* Feature Section Title */}
            <div className="mb-16 mt-10 border-t-1 pt-10">
                <h3 className="md:text-5xl text-2xl font-semibold"> Join Our Blood Donation Community</h3>
                <p className="text-gray-500 text-2xl">Join our blood donation community and be the reason someone gets a second chance.</p>
            </div>


            <div className='flex flex-col md:flex-row gap-8 justify-between  mt-16'>


                <div className='bg-gray-800 basis-1/4 rounded-2xl flex flex-col items-center'>
                    <Lottie className='w-[150px] md:w-[200px]' animationData={userLottie} loop={true}></Lottie>
                    <p className='font-bold text-3xl md:text-5xl' >
                        <CountUp end={user?.donor?.length}
                            duration={18}></CountUp>+
                    </p>
                    <p className=' text-xl mb-12' >Total Donor</p>

                </div>


                <div className='bg-gray-800 basis-1/4 rounded-2xl flex flex-col items-center'>
                    <Lottie className='w-[150px] md:w-[200px]' animationData={donorLottie} loop={true}></Lottie>
                    <p className='font-bold text-3xl md:text-5xl' >
                        <CountUp end={5}
                            duration={8}></CountUp>k $+
                    </p>
                    <p className=' text-xl mb-12' >Total Funding</p>

                </div>


                <div className='bg-gray-800 basis-1/4 rounded-2xl flex flex-col items-center justify-center'>
                    <Lottie className='w-[150px] md:w-[200px]' animationData={handLottie} loop={true}></Lottie>
                    <p className='font-bold text-3xl md:text-5xl' >
                        <CountUp end={user?.donationRequest?.length}
                            duration={18}></CountUp>+
                    </p>
                    <p className='text-xl mb-12' >Total Donation Request</p>


                </div>


            </div>


        </div>
    );
};

export default AdminHomeComponent;