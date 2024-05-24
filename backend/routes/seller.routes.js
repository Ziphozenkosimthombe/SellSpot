import express from 'express';
import upload from '../middleware/multer.middleware';
import protectRoute from '../middleware/protectRoutes.middleware';
import SellProductController from '../controllers/products.controllers';
import ApplyController from '../controllers/seller.controllers';

const router = express.Router();

router.get('/products', protectRoute, SellProductController.getProducts);
router.get(
  '/products/:category',
  protectRoute,
  SellProductController.getByCategory
);
router.post('/apply/:id', protectRoute, ApplyController.applyingToSell);
router.post(
  '/sell',
  protectRoute,
  upload.array('files', 3), // Allow up to 3 files
  SellProductController.createSellProduct
);

export default router;
