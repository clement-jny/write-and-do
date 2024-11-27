"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SigninFormInputs {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = (data) => {
    toast.success("Sign in successful!");
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            className="input"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" className="btn">Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SigninForm;