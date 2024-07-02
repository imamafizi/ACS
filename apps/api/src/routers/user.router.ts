import { SampleController } from '@/controllers/sample.controller';
import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    

    this.router.post('/register', this.userController.registerUser);
    this.router.post('/login', this.userController.loginUser);



    this.router.get('/keeplogin', verifyToken, this.userController.keepLogin);
    this.router.get('/:email', this.userController.getUserByEmail);
    this.router.post('/forgot-password', this.userController.forgotPassword);
    this.router.patch(
      '/reset-password',
      verifyToken,
      this.userController.resetPassword,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
