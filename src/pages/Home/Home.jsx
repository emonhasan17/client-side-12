import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import donorLottie from '../../assets/lotties/donor.json'
import userLottie from '../../assets/lotties/blood donner.json'
import handLottie from '../../assets/lotties/giving-hand.json'
import Lottie from 'lottie-react';
import ContactUsSection from './ContactUsSection';

const Home = () => {

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
            <div className=' h-[40vh] lg:h-[80vh] mx-auto  md:w-full max-w-12/12 mb-10 '>
                <div className='h-full rounded-2xl relative bg-cover bg-center bg-[url("https://i.ibb.co/PzPLq31p/360-F-276718846-1m-Dkx-I8gb6-Frfuw-Ai-Pb6-Ou-B4-M7-Bbeuo-V.jpg")] '>
                    <div class="absolute rounded-2xl inset-0 bg-gradient-to-r from-black/80 to-black/70">
                        <div className=' relative z-10 w-9/12 md:w-6/12 flex flex-col  mx-auto h-full pt-6 md:pt-60 md:space-y-4'>
                            <h1 className=' text-green-400  md:text-5xl text-3xl '>Donate Blood, Save Lives</h1>
                            <p className='md:text-2xl text-[16px] text-gray-300'>By joining our blood donation community, you become part of a life-saving mission that brings hope and healing to thousands every day..</p>
                            <div className='space-x-6'>
                                <Link to='/register'>
                                    <button className='bg-green-600 md:text-xl px-4 py-3 cursor-pointer rounded-xl text-white mt-3 md:mt-6'>Join as a donor</button>
                                </Link>
                                <Link to='/searchPage'>
                                    <button className='bg-green-600 md:text-xl px-4 py-3 cursor-pointer rounded-xl text-white mt-3 md:mt-6'>Search Donors</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Feature Section Title */}
                <div className="mb-16 mt-10 text-center  pt-10">
                    <h3 className="md:text-5xl text-2xl font-semibold"> Join Our Blood Donation Community</h3>
                    <p className="text-gray-500 text-2xl">Join our blood donation community and be the reason someone gets a second chance.</p>
                </div>


                <div className='flex flex-col w-11/12 mx-auto md:flex-row gap-8 justify-between  mt-16'>


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

            <div>
                <ContactUsSection></ContactUsSection>
            </div>

        </div>
    );
};

export default Home;