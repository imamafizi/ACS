'use client';

import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Your password must be at least 8 characters')
    .minLowercase(1)
    .minUppercase(1),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password') ?? ''],
      'Password do not match. Please try again',
    )
    .required('Password cannot be empty'),
});

const CardResetPassword = () => {
  const baseUrl = 'http://localhost:8000/api';
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { password, confirmPassword } = values;
        const { data } = await axios.patch(
          baseUrl + '/users/reset-password',
          {
            password,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert('reset password success');
        router.push('/login');

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
          Reset Password
        </h1>
        <form onSubmit={formik.handleSubmit} style={{ color: '#333' }}>
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

          <div className=" mb-4">
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                aria-describedby="confirmPasswordHelp"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                }}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </span>
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f7f7f7] dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Confirm Password
              </label>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.confirmPassword}
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
            Reset Password
          </button>
        </form>
      </div>
      <EventShowcase />
    </div>
  );
};

export default CardResetPassword;
