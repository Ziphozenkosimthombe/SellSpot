import express from 'express';
import ApplyController from '../controllers/seller.controllers';
import protectRoute from '../middleware/protectRoutes.middleware';

const router = express.Router();

router.post('/create/:id', protectRoute, ApplyController.applyingToSell);

export default router;
