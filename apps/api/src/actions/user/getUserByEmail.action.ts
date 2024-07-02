import { findUserByEmail } from '@/repositories/user/findUserByEmail';

export const getUserByEmailAction = async (email: string) => {
  try {
    const data = await findUserByEmail(email);
    if (!data) return { status: 404, message: 'Email is not found' };
    return {
      status: 200,
      message: 'Success Get Data',
      data,
    };
  } catch (error) {}
};
