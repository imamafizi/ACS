import { RewardController } from '@/controllers/reward.controller';
import { Router } from 'express';

export class RewardRouter {
  private router: Router;
  private rewardController: RewardController;

  constructor() {
    this.rewardController = new RewardController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/check-referralcode',
      this.rewardController.checkReferralCode,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
