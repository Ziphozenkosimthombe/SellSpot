import express from 'express';
import upload from '../middleware/multer.middleware';
import protectRoute from '../middleware/protectRoutes.middleware';
import SellProductController from '../controllers/products.controllers';
import ApplyController from '../controllers/seller.controllers';

const router = express.Router();

router.get('/products', protectRoute, SellProductController.getProducts);
router.get('/uploads', protectRoute, SellProductController.getFromUpload);
router.get(
  '/products/:productId',
  protectRoute,
  SellProductController.getByProductId
);
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
router.delete('/products/:id', protectRoute, SellProductController.deleteProduct);

export default router;
