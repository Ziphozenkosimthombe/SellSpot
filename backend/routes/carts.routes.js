import express from 'express';
import CartsController from '../controllers/carts.controllers';
import protectRoute from '../middleware/protectRoutes.middleware';

const router = express.Router();
router.get('/cart', protectRoute, CartsController.getCart);
router.post('/cart', protectRoute, CartsController.addItemToCart);
router.put('/cart/update-stock', protectRoute, CartsController.updateStockQuantity);
router.delete('/cart', protectRoute, CartsController.removeItemFromCart);

export default router;
