import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {

    const { signIn } = useAuth()

    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

    const location = useLocation()
    const navigate = useNavigate()
    const form = location.state?.form || '/'
    console.log(form)

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(async (result) => {
                console.log(result.user)
                navigate(location.state ? location.state : '/')



            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <div>
            <div className=" bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Login your Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="input"
                                placeholder="Email" />


                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register('password',
                                    {
                                        required: true,
                                        minLength: 6
                                    })}
                                className="input"
                                placeholder="Password" />
                            {
                                errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                            }
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                            }


                            <div><a className="link link-hover">Forgot password?</a></div>


                            <button className="btn btn-primary text-black mt-4">Login</button>
                        </fieldset>
                        <p><small>Don't have an account? <Link to='/register' state={location.state} className='btn btn-link'>Register</Link></small></p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;