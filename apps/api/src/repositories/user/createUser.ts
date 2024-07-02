import prisma from '@/prisma';
import { IUser } from '@/types/user.type';

export const createUser = async (data: IUser) => {
  try {

    const { email, firstName, lastName, password, referralCode, role } = data;

    const result = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,

        referralCode,
        role: {
          create: { name: role.name },
        },

      },
      include: {
        role: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
