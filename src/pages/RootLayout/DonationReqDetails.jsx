import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const DonationReqDetails = () => {
    const { user } = useAuth();
    const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const axiosInstance = useAxiosSecure()
console.log(typeof(id))
    // Fetch donation request using useQuery
    const { data: request, isLoading, refetch } = useQuery({
        queryKey: ['donationRequest', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/donations/api/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const onSubmit = async () => {
        try {
            await axiosInstance.patch(`/donations/request/${id}`, {
                donationStatus: 'inprogress',
                donorName: user.displayName,
                donorEmail: user.email,
            });
            alert('Donation confirmed!');
            setIsModalOpen(false);
            refetch()
        } catch (error) {
            console.error('Failed to confirm donation:', error);
        }
    };

    if(isLoading){
        return <p>loading...</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Donation Request Details</h2>

            <div className="space-y-2 text-gray-700">
                <p><strong>Requester:</strong> {request?.requesterName} ({request?.requesterEmail})</p>
                <p><strong>Recipient:</strong> {request?.recipientName}</p>
                <p><strong>District:</strong> {request?.recipientDistrict}</p>
                <p><strong>Upazila:</strong> {request?.recipientUpazila}</p>
                <p><strong>Hospital:</strong> {request?.hospitalName}</p>
                <p><strong>Full Address:</strong> {request?.fullAddress}</p>
                <p><strong>Blood Group:</strong> {request?.bloodGroup}</p>
                <p><strong>Date & Time:</strong> {request?.donationDate} at {request?.donationTime}</p>
                <p><strong>Message:</strong> {request?.requestMessage}</p>
                <p><strong>Status:</strong>
                    <span className={`ml-1 font-semibold ${request?.donationStatus === 'pending' ? 'text-orange-500' : 'text-green-600'}`}>
                        {request?.donationStatus}
                    </span>
                </p>
            </div>

            {request?.donationStatus === 'pending' && (
                <div className="mt-6">
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Donate</button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="label">Donor Name</label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className="input input-bordered w-full"
                                    {...register('donorName')}
                                />
                            </div>

                            <div>
                                <label className="label">Donor Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                    {...register('donorEmail')}
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-success">Confirm</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default DonationReqDetails;