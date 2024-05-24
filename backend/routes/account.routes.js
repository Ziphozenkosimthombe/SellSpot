import express from 'express';
import AccountController from '../controllers/account.controller';
import protectRoute from '../middleware/protectRoutes.middleware';

const router = express.Router();

router.get('/account', protectRoute, AccountController.getAccount);
router.put('/account', protectRoute, AccountController.updateAccount);
export default router;
