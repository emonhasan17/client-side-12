import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const districts = [
    'Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogura', 'Brahmanbaria',
    'Chandpur', 'Chapainawabganj', 'Chattogram', 'Chuadanga', 'Comilla', 'Cox\'s Bazar',
    'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj',
    'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokati', 'Jhenaidah', 'Joypurhat',
    'Khagrachari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur',
    'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar',
    'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
    'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh',
    'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur',
    'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet',
    'Tangail', 'Thakurgaon'
];



const SearchPage = () => {

    const [bloodGroup, setBloodGroup] = useState('')
    const [district, setDistrict] = useState('')
    const [upazila, setUpazila] = useState('')

    const axiosInstance = useAxiosSecure()


    const { data: donor = [],isLoading,isError } = useQuery({
        queryKey: ['donorData'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all/users')
            return res.data
        },
        enabled: !!bloodGroup && !!district && !!upazila,
    })


    const upazillas = useLoaderData()
    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data)
        setBloodGroup(data.blood_group)
        setDistrict(data.district)
        setUpazila(data.upazila)
    }


    console.log(donor)

    if(isLoading){
        return <p>loading...</p>
    }
    if(isError){
        return <p>error...</p>
    }

    const donorData =  Array.isArray(donor)
    ? donor.filter(d => d.bloodGroup === bloodGroup && d.district === district && d.upazila === upazila)
    : [];

    return (
        <div className="p-6 md:max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">Search for Blood Donors</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    <div>
                        {/* Blood Group */}
                        <label className="label">Blood Group</label>
                        <select {...register("blood_group", { required: true })} className="select select-bordered ">
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                        {errors.blood_group && <p className="text-red-500">Blood group is required</p>}
                    </div>


                    <div>
                        {/* District */}
                        <label className="label">District</label>
                        <select {...register("district", { required: true })} className="select select-bordered">
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                        {errors.district && <p className="text-red-500">District is required</p>}
                    </div>


                    <div>
                        {/* Upazila */}
                        <label className="label">Upazila</label>
                        <select {...register("upazila", { required: true })} className="select select-bordered">
                            <option value="">Select Upazila</option>
                            {upazillas?.map((upazila, index) => (
                                <option key={index} value={upazila?.name}>{upazila?.name}</option>
                            ))}
                        </select>
                        {errors.upazila && <p className="text-red-500">Upazila is required</p>}
                    </div>


                    <button className="btn btn-primary text-black mt-4 ">Search</button>
                </fieldset>
            </form>



            {/* Donors List */}
      { donorData?.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Donor Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donorData?.map(donor => (
              <div key={donor._id} className="card bg-base-100 shadow border p-4">
                <h4 className="text-lg font-bold">{donor.name}</h4>
                <img
                    src={donor?.avatar || 'https://i.ibb.co/2nL6g7T/avatar.png'}
                    alt="avatar"
                    className="w-24 h-24 rounded-full mb-2"
                />
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>District:</strong> {donor.district}</p>
                <p><strong>Upazila:</strong> {donor.upazila}</p>
                <p><strong>status:</strong> {donor.status}</p>
              </div>
            ))}
          </div>
        </div>
      ) :
        <p className="text-center text-gray-500 mt-8">No donors found.</p>
      }


        </div>
    );
};

export default SearchPage;