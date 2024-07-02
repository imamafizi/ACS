import { forgotPasswordAction } from '@/actions/user/forgotPassword.Action';
import { getUserByEmailAction } from '@/actions/user/getUserByEmail.action';
import { keepLoginAction } from '@/actions/user/keepLogin.action';
import { loginAction } from '@/actions/user/login.action';
import { registerAction } from '@/actions/user/register.action';
import { resetPasswordAction } from '@/actions/user/resetPassword.action';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await registerAction(data);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const result = await getUserByEmailAction(email);
      res.status(result?.status as number).send(result);
    } catch (error) {
      next(error);
    }
  }
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginAction(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user!.email;
      const result = await keepLoginAction(email as string);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPasswordAction(req.body.email);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user!.email;
      const result = await resetPasswordAction(email, req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
