import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router';
import ecgLottie from '../../assets/lotties/ECG.json'

const PulseLink = () => {
    return (
        <Link to='/'>
            <div className='flex items-center '>
            <Lottie className='w-20 md:w-[120px]'  animationData={ecgLottie} loop={true}></Lottie>
            <p className='lg:font-semibold lg:text-3xl'>Pulse <br /><span className='text-green-600'>Link</span></p>
            </div>
        </Link>
    );
};

export default PulseLink;