import { hashPassword } from '@/lib/bcrypt';
import { nanoid } from '@/lib/nanoid';
import { createDiscountReferral } from '@/repositories/reward/createDiscountReferral';
import { createPointReferral } from '@/repositories/reward/createPointReferral';
import { findUserByReferralCode } from '@/repositories/reward/findUserByReferralCode';
import { createUser } from '@/repositories/user/createUser';
import { findUserByEmail } from '@/repositories/user/findUserByEmail';
import { ICouponDiscount, IReferralPoints } from '@/types/reward.type';
import { IUser } from '@/types/user.type';
import { addMonths, format } from 'date-fns';

export const registerAction = async (data: IUser) => {
  try {
    const referred = data.referralCode;
    const { email, firstName, lastName, password, role } = data;
    const isExist = await findUserByEmail(email);
    if (isExist) throw new Error('email already exist');


    const hashedPassword = await hashPassword(password);
    data.password = hashedPassword;

    data.referralCode = nanoid();

    const user = await createUser(data);
    if (referred && user.role?.name !== 'promoter') {
      const userReferral = await findUserByReferralCode(referred);
      if (userReferral?.role?.name === 'promoter') {
        return { message: 'Register new user success' };
      }
      if (!userReferral)
        return { status: 404, message: 'Referral code is not found' };
      const currentDate = new Date();
      const futureDate = addMonths(currentDate, 3);
      const formatDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');
      const dataDiscount: ICouponDiscount = {
        userId: user.id,
        couponCode: `${user.referralCode}-discount`,
        discountPersentase: 10,
        expiresOn: new Date(formatDate),
      };

      const dataPoints: IReferralPoints = {
        referrerUserId: userReferral.id,
        referredUserId: user.id,
        pointEarned: 10000,
        expiresOn: new Date(formatDate),
      };
      await createDiscountReferral(dataDiscount);
      await createPointReferral(dataPoints);
    }
    return {
      message: 'Register new user success',
    };
  } catch (error) {
    throw error;
  }
};
