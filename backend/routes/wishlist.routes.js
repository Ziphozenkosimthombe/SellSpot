import express from 'express';
import WishListController from '../controllers/wishList.controllers';
import protectRoute from '../middleware/protectRoutes.middleware';

const router = express.Router();

router.get('/wishlist', protectRoute, WishListController.getWhishList);
router.post('/wishlist', protectRoute, WishListController.addItemToWishList);
router.delete(
  '/wishlist',
  protectRoute,
  WishListController.removeItemFromWishList
);

export default router;
