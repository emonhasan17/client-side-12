
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';



const upazilaPromise = fetch('/upazillaz.json').then(res => res.json())
const districtPromise = fetch('/districrs.json').then(res => res.json())
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
    const { user } = useAuth()
    const axiosInstance = useAxiosSecure()
    const upazilaData = use(upazilaPromise)
    const districtData = use(districtPromise)

    const { data: users } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    console.log(users)


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const selectedDistrict = watch('recipientDistrict');
    const districrsId = districtData.find(d => d.name === selectedDistrict)


    const getUpazilaByDistrict = id => {
        return upazilaData.filter(u => u?.district_id === id)
    }


    const onSubmit = async (data) => {
        const requestData = {
            ...data,
            requesterName: user.displayName
            ,
            requesterEmail: user.email,

            donationStatus: 'pending',
        };
        console.log(requestData)
        // save data to the server
        await axiosInstance.post('/donation-requests', requestData)
            .then(res => {
                if (res.data.insertedId) {
                    //todo: redirect to a payment page
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: `Donation request created successfully!`,
                        confirmButtonText: 'OK',
                    });
                    reset()
                }
                console.log(res.data)
            })

        // try {
        //     await axios.post('/api/donation-requests', requestData);
        //     alert('Donation request created successfully!');
        //     reset();
        // } catch (error) {
        //     console.error('Error creating request:', error);
        //     alert('Failed to create request');
        // }
    };

    if (users?.status !== 'active') {
        return <p>You are Blocked</p>
    }
    return (
        <div className="max-w-2xl mx-auto p-6 mt-10 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Donation Request</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                {/* Requester Name */}
                <label className="form-control">Requester Name</label>
                <input type="text" className="input input-bordered bg-base-300" value={user.displayName
                } readOnly />


                {/* Requester Email */}
                <label className="form-control">Requester Email</label>
                <input type="email" className="input input-bordered bg-base-300" value={user.email} readOnly />


                {/* Recipient Name */}
                <label className="form-control">Recipient Name</label>
                <input type="text" {...register('recipientName', { required: true })} className="input input-bordered" />
                {errors.recipientName && <span className="text-red-500 text-sm">Required</span>}


                {/* Recipient District */}
                <label className="form-control">Recipient District</label>
                <select {...register('recipientDistrict', { required: true })} className="select select-bordered">
                    <option value="">Select District</option>
                    {districtData?.map((d, idx) => (
                        <option key={idx} value={d?.name}>{d?.name}</option>
                    ))}
                </select>
                {errors.recipientDistrict && <span className="text-red-500 text-sm">Required</span>}


                {/* Recipient Upazila */}
                <label className="form-control">Recipient Upazila</label>
                <select {...register('recipientUpazila', { required: true })} className="select select-bordered">
                    <option value="">Select Upazila</option>
                    {districrsId?.id ?
                        getUpazilaByDistrict(districrsId?.id).map((u, idx) => (
                            <option key={idx} value={u?.name}>{u?.name}</option>
                        )) : upazilaData?.map((upazila, index) => (
                            <option key={index} value={upazila?.name}>{upazila?.name}</option>

                        ))
                    }
                </select>
                {errors.recipientUpazila && <span className="text-red-500 text-sm">Required</span>}


                {/* Hospital Name */}
                <label className="form-control">Hospital Name</label>
                <input type="text" {...register('hospitalName', { required: true })} className="input input-bordered" />
                {errors.hospitalName && <span className="text-red-500 text-sm">Required</span>}


                {/* Full Address */}
                <label className="form-control">Full Address</label>
                <input type="text" {...register('fullAddress', { required: true })} className="input input-bordered" />
                {errors.fullAddress && <span className="text-red-500 text-sm">Required</span>}


                {/* Blood Group */}
                <label className="form-control">Blood Group</label>
                <select {...register('bloodGroup', { required: true })} className="select select-bordered">
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>
                {errors.bloodGroup && <span className="text-red-500 text-sm">Required</span>}


                {/* Donation Date */}
                <label className="form-control">Donation Date</label>
                <input type="date" {...register('donationDate', { required: true })} className="input input-bordered" />
                {errors.donationDate && <span className="text-red-500 text-sm">Required</span>}


                {/* Donation Time */}
                <label className="form-control">Donation Time</label>
                <input type="time" {...register('donationTime', { required: true })} className="input input-bordered" />
                {errors.donationTime && <span className="text-red-500 text-sm">Required</span>}


                {/* Request Message */}
                <label className="form-control">Request Message</label>
                <textarea
                    {...register('requestMessage', { required: true })}
                    className="textarea textarea-bordered"
                    rows="4"
                />
                {errors.requestMessage && <span className="text-red-500 text-sm">Required</span>}


                {/* Submit Button */}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">Request</button>
                </div>
            </form>
        </div>
    );
};

export default CreateDonationRequest;
