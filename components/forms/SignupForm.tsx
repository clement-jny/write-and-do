"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignupFormInputs {
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    toast.success("Sign up successful!");
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Merci de renseigner un Email" })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Merci de renseigner un mot de passe",
              minLength: { value: 6, message: "Le mot de passe doit contenir au minimum 6 caractères." }
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          S'inscrire
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
