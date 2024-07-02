'use client';

import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/lib/hooks';
import { loginAction } from '@/lib/features/userSlice';
import { Toast } from 'flowbite-react';
import EventShowcase from '@/components/EventShowcase';

YupPassword(yup);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),
});

const CardForgotPassword = () => {
  const baseUrl = 'http://localhost:8000/api';
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { email } = values;
        const { data } = await axios.post(baseUrl + '/users/forgot-password', {
          email,
        });

        alert('email forgot passsword send successfully');
        router.push('/');

        //   console.log(userData);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data || error.message;
          alert(errorMsg);
        }
      }
    },
  });
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 p-56 pt-40" style={{ background: '#F7F7F7' }}>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          Forgot Password?
        </h1>
        <form onSubmit={formik.handleSubmit} style={{ color: '#333' }}>
          <div className="relative mb-4">
            <input
              id="email"
              name="email"
              type="email"
              aria-describedby="emailHelp"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email Address
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ff4b00',
              color: 'white',
              borderRadius: '4px',
              border: 'none',
              marginTop: '20px',
            }}
          >
            Continue
          </button>
        </form>
      </div>
      <EventShowcase />
    </div>
  );
};

export default CardForgotPassword;
