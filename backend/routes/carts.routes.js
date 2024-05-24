import express from 'express';
import CartsController from '../controllers/carts.controllers';
import protectRoute from '../middleware/protectRoutes.middleware';

const router = express.Router();
router.get('/get-cart', protectRoute, CartsController.getCart)
router.post('/addItem', protectRoute, CartsController.addItemToCart);
router.delete('/remove-cart', protectRoute, CartsController.removeItemFromCart)

export default router;
