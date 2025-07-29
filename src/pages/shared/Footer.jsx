import React from 'react';
import { Link } from 'react-router';
import { SiFacebook } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import PulseLink from './PulseLink';

const Footer = () => {
    return (
        <div className='relative mt-16 md:mt-28 min-h-[60vh]  bg-cover bg-center bg-[url("https://i.ibb.co/PzPLq31p/360-F-276718846-1m-Dkx-I8gb6-Frfuw-Ai-Pb6-Ou-B4-M7-Bbeuo-V.jpg")] '>

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/70">


                <div className='relative z-10 text-white lg:max-w-6/12 mx-auto  p-10 className= space-y-10 mt-3'>
                    <div >
                        <div className='flex flex-col justify-center items-center'>
                            <PulseLink></PulseLink>
                            
                            <p className='lg: text-center md:text-[16px] text-gray-400 mt-5'>PulseLink is a community-driven blood donation platform dedicated to saving lives. We connect donors with those in urgent need across Bangladesh. Join us in making a difference—because every drop counts.</p>
                        </div>

                    </div>

                    <div className='border-t-1 border-gray-600 flex justify-between'>


                        <div className='border-r-1 border-gray-600 flex-1 text-center p-2 md:p-10'>
                            <h1 className='md:text-[18px]'>If you have any query Contact us : <br /><span>support@PulseLink.com</span></h1>

                        </div>

                        <div className='flex-1 text-center p-2 md:p-10'>
                            <h1>Follow Us</h1>
                            <div class="flex  gap-4 md:gap-8 items-center justify-center ">
                                <Link to='https://www.facebook.com/shwapnil.emon.2024'>
                                    <button onclick="facebookHandler()" class="cursor-pointer hover:text-[#4C6df0]"><SiFacebook size={30} /></button>
                                </Link>
                                <Link to='https://www.youtube.com/'>
                                    <button onclick="youtubeHandler()" class="cursor-pointer hover:text-red-500"><FaYoutube size={30} /></button>
                                </Link>
                                <Link to='https://www.instagram.com/'>
                                    <button onclick="instaHandler()" class="cursor-pointer hover:text-[#F22F91]"><FaInstagram size={30} /></button>
                                </Link>
                                <Link to='https://github.com/programming-hero-web-course1/b11-a6-english-janala-emonhasan17'>
                                    <button onclick="githubHandler()" class="cursor-pointer "><FaGithub size={30} /></button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <p className='text-center text-gray-400 md:text-[18px]'>© Copyright 2025 All rights reserved by PulseLink</p>



                </div>



            </div>

        </div>
    );
};

export default Footer;