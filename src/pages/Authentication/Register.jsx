import axios from 'axios';
import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';


const upazilaPromise = fetch('/upazillaz.json').then(res=> res.json())
const districtPromise = fetch('/districrs.json').then(res=> res.json())
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const districts = [
    'Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogura', 'Brahmanbaria',
    'Chandpur', 'Chapainawabganj', 'Chattogram', 'Chuadanga', 'Comilla', 'Cox\'s Bazar',
    'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj',
    'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokati', 'Jhenaidah', 'Joypurhat',
    'Khagrachari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur',
    'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar',
    'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
    'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh',
    'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur',
    'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet',
    'Tangail', 'Thakurgaon'
];

const Register = () => {

    const upazilaData = use(upazilaPromise)
    const districtData = use(districtPromise)

    const { register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm()

        const selectedDistrict = watch('district');

        const districrsId = districtData.find(d => d.name === selectedDistrict)

        console.log(upazilaData.filter(u=> u?.district_id === districrsId?.id))


        const getUpazilaByDistrict = id => {
            return upazilaData.filter(u=> u?.district_id === id)
        }

    const { createUser, updateUserProfile } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const axiosInstance = useAxios()


    const [profilePic, setProfilePic] = useState('')



    const onSubmit = data => {
        console.log(data)
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match");
            return;
        }

        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)

                // update user info in data base

                const userInfo = {
                    email: data.email,
                    name: data.name,
                    avatar: profilePic,
                    bloodGroup: data.blood_group,
                    district: data.district,
                    upazila: data.upazila,
                    role: 'donor',  //default role
                    status: 'active'
                }

                const userRes = await axiosInstance.post('/users',userInfo)
                console.log(userRes.data)


                // update profile in firebase
                const updateProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(updateProfile)
                    .then(() => {
                        console.log('profile updated')
                    })
                    .catch(error => {
                        console.log(error)
                    })


                navigate(location.state ? location.state : '/')


            })
            .catch(error => {
                console.error(error)
            })


    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        console.log(image)
        const formData = new FormData()
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData)
        setProfilePic(res.data.data.url)
    }


    return (
        <div className=" bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create an Account!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Your name" />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

                        {/* image field */}
                        <label className="label">Your Profile Picture</label>
                        <input type="file" onChange={handleImageUpload} className="input" placeholder="Your Profile Picture" />

                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                        {/* Blood Group */}
                        <label className="label">Blood Group</label>
                        <select {...register("blood_group", { required: true })} className="select select-bordered ">
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                        {errors.blood_group && <p className="text-red-500">Blood group is required</p>}


                        {/* District */}
                        <label className="label">District</label>
                        <select {...register("district", { required: true })} className="select select-bordered">
                            <option value="">Select District</option>
                            {districtData?.map((district,idx) => (
                                <option key={idx} value={district?.name}>{district?.name}</option>
                            ))}
                        </select>
                        {errors.district && <p className="text-red-500">District is required</p>}


                        {/* Upazila */}
                        <label className="label">Upazila</label>
                        <select {...register("upazila", { required: true })} className="select select-bordered">
                            <option value="">Select Upazila</option>

                            { districrsId?.id ?
                                getUpazilaByDistrict(districrsId?.id).map((u,idx)=>(
                                    <option key={idx} value={u?.name}>{u?.name}</option> 
                                )) : upazilaData?.map((upazila, index) => (
                                    <option key={index} value={upazila?.name}>{upazila?.name}</option>
                                    
                                ))
                            }
                        </select>
                        {errors.upazila && <p className="text-red-500">Upazila is required</p>}

                        {/* password field */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be six character or longer</p>}

                        {/* Confirm Password */}
                        <label className="label">Confirm Password</label>
                        <input {...register("confirm_password", { required: true })} type="password" placeholder="Confirm Password" className="input input-bordered" />
                        {errors.confirm_password && <p className="text-red-500">Please confirm your password</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link to='/login' className='btn btn-link'>Login</Link></small></p>
                </form>
            </div>
        </div>
    );
};

export default Register;