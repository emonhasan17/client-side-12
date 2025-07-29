

import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Blog = () => {
    const axiosInstance = useAxiosSecure()
    const { data: blogs = [],
        isLoading,
        isError } = useQuery({
            queryKey: ['blogs'],
            queryFn: async () => {
                const res = await axiosInstance.get('/api/blogs')
                return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        })

        // const filterBlog = blogs.filter(b=> b.status === 'published')
        // console.log(filterBlog)

    

    

   

    

    return (
        <div className="p-6 max-w-10/12 mx-auto">
            <div className="text-center mb-6">
                <div className="">
                    <h1 className="text-4xl font-bold">Our Latest Blogs</h1>
                </div>
            </div>



            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to load blogs.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div key={blog._id} className="card border p-4 shadow">


                            <img src={blog.thumbnail} alt={blog.title} className="h-50 w-full object-cover rounded" />

                            <h3 className="text-lg font-bold mt-2">{blog.title}</h3>

                            <p className="text-sm text-gray-600 mt-1">Status: <span className="font-semibold">{blog.status}</span></p>

                            <p className="text-sm text-gray-500 mt-1">Created At: <span className="font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span></p>

                            <Link to={`/blogDetails/${blog._id}`} className="btn btn-success">Read Blog</Link>


                        </div>
                    ))}
                </div>
            )}




            {/* Add blog listing or content controls below if needed */}
        </div>
    );
};

export default Blog;
