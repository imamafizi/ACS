import prisma from '@/prisma';
import { IReferralPoints } from '@/types/reward.type';

export const createPointReferral = async (data: IReferralPoints) => {
  try {
    const { referrerUserId, referredUserId, pointEarned, expiresOn } = data;
    const result = await prisma.referralPoints.create({
      data: {
        referrerUserId,
        referredUserId,
        pointEarned,
        expiresOn,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
