import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const EditDonationReqForAdmin = () => {

    const { id } = useParams()
    const axiosInstance = useAxiosSecure()

    const { data: donation = {}, isLoading, refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosInstance.get(`donations/api/${id}`)
            return res.data
        }
    })
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({
        defaultValues: donation,
    });



    const { mutateAsync: updateData } = useMutation({
        mutationFn: async (data) => {
            await axiosInstance.put(`/admin/all/donations/${id}`, data)
        },
        onSuccess: () => {
            Swal.fire('Success', 'request updated', 'success');
            navigate('/dashboard/allBloodDonationReq')
            refetch()
            
        },
        onError: () => {
            Swal.fire('Error', 'Failed to update request', 'error');
        },
    });

    const onSubmit = (data) => {
        const { _id, ...rest } = data
        updateData(rest)
    };
    if (isLoading) {
        return <p>loading....</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">


                <div>
                    {/* Recipient Name */}
                    <label className="form-control">Recipient Name</label>
                    <input type="text" {...register('recipientName', { required: true })} className="input input-bordered" />
                </div>


                <div>
                    {/* Recipient District */}
                    <label className="form-control">Recipient District</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register('recipientDistrict', { required: true })}
                        placeholder="Recipient District"
                    />
                </div>


                <div>
                    {/* Recipient Upazila */}
                    <label className="form-control">Recipient Upazila</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        {...register('recipientUpazila', { required: true })}
                        placeholder="Recipient Upazila"
                    />
                </div>


                <div>
                    {/* Hospital Name */}
                    <label className="form-control">Hospital Name</label>
                    <input type="text" {...register('hospitalName', { required: true })} className="input input-bordered" />
                </div>


                <div>
                    {/* Full Address */}
                    <label className="form-control">Full Address</label>
                    <input type="text" {...register('fullAddress', { required: true })} className="input input-bordered" />
                </div>


                <div>
                    {/* Blood Group */}
                    <label className="form-control">Blood Group</label>
                    <input type="text" {...register('bloodGroup', { required: true })} className="input input-bordered" />
                </div>


                <div>
                    {/* Donation Date */}
                    <label className="form-control">Donation Date</label>
                    <input type="date" {...register('donationDate', { required: true })} className="input input-bordered" />
                </div>


                <div>
                    {/* Donation Time */}
                    <label className="form-control">Donation Time</label>
                    <input type="time" {...register('donationTime')} className="input input-bordered" />
                </div>

                <div>
                    {/* Request Message */}
                    <label className="form-control">Request Message</label>
                    <textarea
                        {...register('requestMessage', { required: true })}
                        className="textarea textarea-bordered"
                        rows="4"
                    />
                </div>
                <div>

                </div>

                {/* Submit Button */}
                <div className=" mt-4">
                    <button type="submit" className="btn btn-primary">Edit</button>
                </div>
            </form>
        </div>
    );
};

export default EditDonationReqForAdmin;