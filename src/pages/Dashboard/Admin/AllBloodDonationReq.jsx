import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useUserRole from '../../../hooks/useUserRole';

const AllBloodDonationReq = () => {

    const axiosInstance = useAxiosSecure();
    const { role } = useUserRole()
    const [filter, setFilter] = useState('all')

    const { data: donations = [], isLoading, refetch } = useQuery({
        queryKey: ['allDonationRequests'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin/all/donations');
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This request will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosInstance.delete(`/admin/all/donations/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: `Your parcel has been deleted.`,
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch()
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Server error. Try again later.', 'error');
                    });
            }
        });
    };

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, update }) => {
            await axiosInstance.patch(`/donations/request/${id}`, update)
        },
        onSuccess: () => {
            Swal.fire('Success', 'User role updated', 'success');
            refetch();
        },
        onError: () => {
            Swal.fire('Error', 'Failed to update role', 'error');
        },
    });

    const handleUpdate = (id, field, value) => {
        // updateUser.mutate({ id, update: { [field]: value } });
        const update = { [field]: value }
        console.log(update, id)
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to change ${field} to ${value}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateRole({ id, update });
                Swal.fire('success', `${field} updated successfully`)
            }
        });
    };


    if (isLoading) return <div className="text-center my-10">Loading...</div>;

    const filteredStatus =
        filter === 'all' ? donations : donations.filter((d) => d.donationStatus === filter);



    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Donation Requests</h2>

            <div className="mb-4">
                <select
                    className="select select-bordered"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">all</option>
                    <option value="pending">pending</option>
                    <option value="inprogress">inprogress</option>
                    <option value="done">done</option>
                    <option value="cancel">cancel</option>
                </select>
            </div>

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
                            <th>Donation Progress</th>
                            <th>Donor Info</th>
                            {
                                role === 'admin' && <th>Actions</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {filteredStatus.map((donation, idx) => (
                            <tr key={donation._id}>
                                <td>{idx + 1}</td>
                                <td>{donation.recipientName}</td>
                                <td>{donation.recipientDistrict}, {donation.recipientUpazila}</td>
                                <td>{donation.donationDate}</td>
                                <td>{donation.donationTime}</td>
                                <td>{donation.bloodGroup}</td>
                                <td className="capitalize">{donation.
                                    donationStatus}</td>
                                <td className="flex flex-col gap-3">
                                    {donation.
                                        donationStatus === 'inprogress' ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdate(donation._id, 'donationStatus', 'done')}
                                                className="btn btn-success btn-sm"
                                            >
                                                Done
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(donation._id, 'donationStatus', 'cancel')}
                                                className="btn btn-error btn-sm"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>
                                    {donation.
                                        donationStatus === 'inprogress' ? (
                                        <>
                                            <div>{donation?.donorName}</div>
                                            <div className="text-xs text-gray-500">{donation?.donorEmail}</div>
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                {
                                    role === 'admin' && <td className="flex flex-col gap-1">
                                        <Link to={`/dashboard/donations/edit/admin/${donation._id}`} className="btn btn-xs btn-info">Edit</Link>
                                        <button onClick={() => handleDelete(donation._id)} className="btn btn-xs btn-error">Delete</button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBloodDonationReq;