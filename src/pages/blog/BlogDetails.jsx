import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const BlogDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure();

    const { data: blog, isLoading, isError } = useQuery({
        queryKey: ['blog', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs/api/${id}`);
            return res.data;
        },


    });

    if (isLoading) return <p className="text-center py-10">Loading blog...</p>;
    if (isError || !blog) return <p className="text-center py-10 text-red-500">Blog not found.</p>;


    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-500 text-sm mb-6">
                Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {blog.thumbnail && (
                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-auto object-cover rounded-lg mb-6"
                />
            )}
            <article
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </section>
    );
};

export default BlogDetails;