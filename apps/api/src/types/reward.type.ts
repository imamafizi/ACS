export interface ICouponDiscount {
  id?: number;
  userId: number;
  couponCode: string;
  discountPersentase: number;
  dateReceived?: Date;
  expiresOn: Date;
}

export interface IReferralPoints {
  id?: number;
  referrerUserId: number;
  referredUserId: number;
  pointEarned: number;
  dateEarned?: Date;
  expiresOn: Date;
}
