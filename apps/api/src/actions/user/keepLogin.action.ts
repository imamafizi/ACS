import { excludeFields } from '@/helpers/excludeFields';
import { comparePasswords, hashPassword } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { nanoid } from '@/lib/nanoid';
import { createUser } from '@/repositories/user/createUser';
import { findUserByEmail } from '@/repositories/user/findUserByEmail';
import { IUser } from '@/types/user.type';

export const keepLoginAction = async (email: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('account not found');
    const dataWithoutPassword = excludeFields(user, ['password']);

    return {
      message: 'keeplogin success',
      data: dataWithoutPassword,
    };
  } catch (error) {
    throw error;
  }
};
