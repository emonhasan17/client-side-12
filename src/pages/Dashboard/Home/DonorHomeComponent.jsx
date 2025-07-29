import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const DonorHomeComponent = () => {
    const { user } = useAuth()
    const axiosInstance = useAxiosSecure()

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['myDonationRequests', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/donations?email=${user?.email}`);
            return res.data.sort((a, b) => new Date(a.donationDate) - new Date(b.donationDate)).slice(0, 3);
        },
        enabled: !!user?.email,
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
                await axiosInstance.delete(`/donations/${id}`)
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
        const update = {[field]: value}
        console.log(update,id)
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to change ${field} to ${value}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateRole({ id,  update});
                Swal.fire('success', `${field} updated successfully`)
            }
        });
    };



    return (
        <div>
            {/* Recent 3 Donations */}

            {
                donations.length > 0 && (


                    <div className="p-4 rounded-xl shadow  overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4 text-primary">Your Recent Donation Requests</h2>

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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation, idx) => (
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
                                                    donationStatus === 'inprogress' && donation.donor ? (
                                                    <>
                                                        <div>{donation.donor.name}</div>
                                                        <div className="text-xs text-gray-500">{donation.donor.email}</div>
                                                    </>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td className="flex flex-col gap-1">
                                                <Link to={`/dashboard/donations/edit/${donation._id}`} className="btn btn-xs btn-info">Edit</Link>
                                                <button onClick={() => handleDelete(donation._id)} className="btn btn-xs btn-error">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <Link to='/dashboard/myDonationReq' className='btn btn-success mt-6'>View All Donation Request</Link>
                    </div>
                )
            }


        </div>
    );
};

export default DonorHomeComponent;