import prisma from '@/prisma';

export const findUserByEmail = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
