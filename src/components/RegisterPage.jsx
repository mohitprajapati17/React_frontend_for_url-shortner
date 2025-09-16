import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registeration Successful!")
        } catch (error) {
            console.log(error);
            toast.error("Registeration Failed!")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-black'>
        <form onSubmit={handleSubmit(registerHandler)}
            className="sm:w-[520px] w-[360px] gradient-border card-hover py-8 sm:px-8 px-4 rounded-md">
            <h1 className="text-center font-roboto text-yellow-400 font-bold lg:text-3xl text-2xl">
                Create your account
            </h1>

            <hr className='mt-2 mb-5 border-yellow-500/30'/>

            <div className="flex flex-col gap-3">
                <TextField
                    label="UserName"
                    required
                    id="username"
                    type="text"
                    message="*Username is required"
                    placeholder="Type your username"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Email"
                    required
                    id="email"
                    type="email"
                    message="*Email is required"
                    placeholder="Type your email"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="*Password is required"
                    placeholder="Type your password"
                    register={register}
                    min={6}
                    errors={errors}
                />
            </div>

            <button
                disabled={loader}
                type='submit'
                className='font-semibold text-black bg-yellow-500 hover:bg-yellow-400 w-full py-3 transition-colors duration-150 rounded-md my-4'>
                {loader ? "Loading..." : "Create account"}
            </button>

            <p className='text-center text-sm text-gray-300 mt-2'>
                Already have an account? 
                <Link
                    className='font-semibold underline hover:text-yellow-400'
                    to="/login">
                        <span className='text-yellow-400'> Login</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default RegisterPage