import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const [filter, setFilter] = useState('all');
    const axiosInstance = useAxiosSecure()

    const { data: users = [],  refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all/users');
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, update }) => {
            await axiosInstance.patch(`/users/${id}`, update)
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
        Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to change ${field} to ${value}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateRole({ id, update: {[field]: value} });
                Swal.fire('success', `${field} updated successfully`)
            }
        });
    };

    const filteredUsers =
        filter === 'all' ? users : users.filter((user) => user.status === filter);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>

            <div className="mb-4">
                <select
                    className="select select-bordered"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <img
                                        src={user.avatar || '/default-avatar.png'}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        className="select select-sm select-bordered"
                                        value={user.role}
                                        onChange={(e) => handleUpdate(user._id, 'role', e.target.value)}
                                    >
                                        <option value="donor">Donor</option>
                                        <option value="volunteer">Volunteer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="select select-sm select-bordered"
                                        value={user.status}
                                        onChange={(e) => handleUpdate(user._id, 'status', e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
