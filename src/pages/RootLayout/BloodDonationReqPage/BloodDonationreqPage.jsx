import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const BloodDonationreqPage = () => {

    const axiosInstance = useAxiosSecure();

    const { data: donations = [], isLoading} = useQuery({
        queryKey: ['allDonationRequests'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin/all/donations');
            return res.data;
        },
    });


    const filteredDonations = donations.filter(d => d.donationStatus === 'pending')

    if (isLoading) return <div className="text-center my-10">Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Actions</th>


                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonations.map((donation, idx) => (
                            <tr key={donation._id}>
                                <td>{idx + 1}</td>
                                <td>{donation.recipientName}</td>
                                <td>{donation.recipientDistrict}, {donation.recipientUpazila}</td>
                                <td>{donation.donationDate}</td>
                                <td>{donation.donationTime}</td>
                                <td>{donation.bloodGroup}</td>
                                <td className="capitalize">{donation.
                                    donationStatus}</td>
                                <td className="flex flex-col gap-1">
                                    <Link to={`/donationReqDetails/${donation._id}`} className="btn btn-xs btn-error">View</Link>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BloodDonationreqPage;