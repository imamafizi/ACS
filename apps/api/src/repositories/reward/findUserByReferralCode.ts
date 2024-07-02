import prisma from '@/prisma';

export const findUserByReferralCode = async (referralCode: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { referralCode },
      include: { role: true },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
