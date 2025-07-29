import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const axiosInstance = useAxiosSecure()


    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imageUploadUrl, formData)
        setThumbnail(res.data.data.url)

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            title,
            thumbnail,
            content,
            createdAt: new Date().toISOString(),
            status: 'draft',
        };
        console.log(blogData)

        Swal.fire({
                    title: 'Do You Want to Post This Blog?',
                    text: 'Check if their any mistake',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, Post it!',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axiosInstance.post('/blogs',blogData)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'posted',
                                        text: `Your blog has been saved as draft.An admin can check it and if all is ok your blog is going to be posted`,
                                        timer: 1500,
                                        showConfirmButton: false,
                                    });
                                    navigate('/dashboard/contentManagement')
                                }
                            })
                            .catch(() => {
                                Swal.fire('Error', 'Server error. Try again later.', 'error');
                            });
                    }
                })

        // TODO: Replace with your API endpoint
        // const res = await fetch('/api/blogs', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(blogData),
        // });

        // if (res.ok) {
        //     navigate('/dashboard');
        // }
    };



    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
            <p className="text-gray-600 mb-6">Fill in the form below to publish a new blog post.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="form-control">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="form-control">Thumbnail Image</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        onChange={handleImageUpload}
                        required
                    />
                </div>

                <div className='bg-white text-black p-2 rounded'>
                    <label className="form-control">Content</label>
                    <JoditEditor
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                    Create
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
