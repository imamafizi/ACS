import prisma from '@/prisma';
import { IUser } from '@/types/user.type';

export const updateUser = async (email: string, data: any )=> {
  try {
    const result = await prisma.user.update({ data, where: { email } });
    return result;
  } catch (error) {
    throw error;
  }
};
