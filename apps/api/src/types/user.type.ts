export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  referralCode: string;
}

export interface IRole {
  id: number;
  userId: number;
  name: string;
}

