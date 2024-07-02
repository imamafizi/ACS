'use client';

import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginAction } from '@/lib/features/userSlice';
import { Toast } from 'flowbite-react';
import EventShowcase from '@/components/EventShowcase';

YupPassword(yup);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email cannot be empty'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Your password must be at least 8 characters')
    .minLowercase(1)
    .minUppercase(1),
});

const CardLogin = () => {
  const baseUrl = 'http://localhost:8000/api';

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (selector.role.name === 'customer') {
      router.push('/');
    }
    if (selector.role.name === 'promoter') {
      router.push('/promoters');
    }
  }, [selector]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const { data } = await axios.post(baseUrl + '/users/login', {
          email,
          password,
        });
        console.log(data.data.role.name);
        if (data.data.role.name === 'customer') {
          router.push('/');
        }

        dispatch(loginAction(data.data));
        localStorage.setItem('token_auth', data.token);
        alert('login success');
        router.push('/promoters');

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
          Welcome Back
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
          <div className=" mb-4">
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                aria-describedby="passwordHelp"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </p>
              )}
            </div>
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
            Login
          </button>
          <p className=" mt-4">
            {"Don't have an account? "}
            <Link href="/register" className="font-bold hover:underline">
              Register
            </Link>
          </p>
          <p className=" mt-10 text-sm">
            <Link href="/forgot-password" className="font-bold hover:underline">
              Forgot password?
            </Link>
          </p>
        </form>
      </div>
      <EventShowcase />
    </div>
  );
};

export default CardLogin;
