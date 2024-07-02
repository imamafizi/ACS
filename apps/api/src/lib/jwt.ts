import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.JWT_SECRET_KEY!;

export const createToken = (data: any): string => {
  const expiresIn = '1h';
  return jwt.sign(data, secretKey, { expiresIn });
};
