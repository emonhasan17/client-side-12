import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useUserRole from "../../../hooks/useUserRole";


const ContentManagement = () => {
    const navigate = useNavigate();
    const axiosInstance = useAxiosSecure()
    const [statusFilter, setStatusFilter] = useState('all')
    const { role } = useUserRole()

    const { data: blogs = [],
        refetch,
        isLoading,
        isError } = useQuery({
            queryKey: ['blogs', statusFilter],
            queryFn: async () => {
                const res = await axiosInstance.get('/blogs')
                return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        })

    const handleAddBlog = () => {
        navigate('/dashboard/contentManagement/addBlog');
    };

    const handleStatusChange = async (id, status) => {
        await axiosInstance.patch(`/blogs/${id}`, { status });
        refetch();
        console.log('update')
    };

    const handleDelete = async (id) => {
        await axiosInstance.delete(`/blogs/${id}`);
        refetch();
    };


    const filteredBlogs = statusFilter === 'all'
        ? blogs
        : blogs.filter(blog => blog.status === statusFilter)

    return (
        <div className="p-6 max-w-10/12 mx-auto">
            <div className="md:flex justify-between items-center mb-6">
                <div className="">
                    <h1 className="text-4xl font-bold">Content Management</h1>
                    <p className="mb-4 text-xl  text-gray-600">
                        Manage all blog content from here. You can add new blogs, edit existing ones, and keep your platform updated with the latest information for your users.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={handleAddBlog}>
                    Add Blog
                </button>
            </div>


            <select
                className="select select-bordered mb-6 w-6/12"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="all">All</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>



            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to load blogs.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map(blog => (
                        <div key={blog._id} className="card border p-4 shadow">


                            <img src={blog.thumbnail} alt={blog.title} className="h-50 w-full object-cover rounded" />

                            <h3 className="text-lg font-bold mt-2">{blog.title}</h3>

                            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-semibold">{blog.status}</span></p>

                            <p className="text-sm text-gray-500 mt-1">Created At: <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span></p>


                            {
                                role === 'admin' && <div className="mt-3 flex flex-wrap gap-2">

                                    {blog.status === 'draft' ? (
                                        <button onClick={() => handleStatusChange(blog._id, 'published')} className="btn btn-success btn-sm">Publish</button>
                                    ) : (
                                        <button onClick={() => handleStatusChange(blog._id, 'draft')} className="btn btn-warning btn-sm">Unpublish</button>
                                    )}
                                    <button onClick={() => handleDelete(blog._id)} className="btn btn-error btn-sm">Delete</button>

                                </div>
                            }
                        </div>
                    ))}
                </div>
            )}




            {/* Add blog listing or content controls below if needed */}
        </div>
    );
};

export default ContentManagement;
