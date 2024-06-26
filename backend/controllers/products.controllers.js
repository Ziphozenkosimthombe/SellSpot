import Products from '../models/Products.models';
import cloudinary from '../middleware/cloudinary.middleware';
import Seller from '../models/Seller.model';
import User from '../models/User.models';
class SellProductController {
  static async createSellProduct(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        const error = new Error('Please upload at least one file');
        error.status = 400;
        return next(error);
      }

      // Upload multiple files to Cloudinary
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);

      // Extract URLs and public IDs
      const imageUrls = results.map((result) => result.secure_url);
      const cloudinaryIds = results.map((result) => result.public_id);

      //
      //Get other form data
      const {title, description, price, category, stock_quantity} = req.body;

      const userId = req.user._id;
      const user = await Seller.findOne({user: userId});
      const sellerId = user._id;
      //      console.log(user);
      if (!sellerId) {
        const error = new Error(
          'you can not have the rights to sell on the platform just please register to sell first'
        );
        error.status = 400;
        return next(error);
      }
      const isASeller = await User.findById(userId);
      if (isASeller.is_seller === false) {
        const error = new Error(
          'you can not sell on the platform just please register to sell first'
        );
        error.status = 400;
        return next(error);
      }
      const newSellProduct = new Products({
        title,
        description,
        price,
        category,
        images: imageUrls, // Store image URLs
        cloudinaryId: cloudinaryIds, // Store Cloudinary IDs
        stock_quantity,
        seller: sellerId,
        user: userId,
      });

      await newSellProduct.save();

      if (newSellProduct) {
        res.status(201).json({
          _id: newSellProduct._id,
          title: newSellProduct.title,
          description: newSellProduct.description,
          price: newSellProduct.price,
          category: newSellProduct.category,
          images: newSellProduct.images,
          cloudinaryId: newSellProduct.cloudinaryId,
          stock_quantity: newSellProduct.stock_quantity,
          status: newSellProduct.status,
          seller: newSellProduct.seller,
        });
      } else {
        const error = new Error('Something went wrong');
        error.status = 400;
        return next(error);
      }
    } catch (err) {
      console.log('Error on the sellProduct.controller createSellProduct', err);
      return next(err);
    }
  }
  static async getProducts(_req, res, next) {
    try {
      const products = await Products.find().populate({
        path: 'seller',
        select: 'firstName lastName email phoneNumber companyName',
      });

      res.status(200).json(products);
    } catch (err) {
      console.log('Error on the sellProduct.controller getProducts', err);
      return next(err);
    }
  }
  static async getFromUpload(req, res, next) {
    try {
      const userId = req.user.id; // Get the logged-in user's ID
      const products = await Products.find({user: userId}).populate({
        path: 'seller',
        select: 'firstName lastName email phoneNumber companyName',
      });
      res.status(200).json(products);
    } catch (err) {
      console.log('Error on the sellProduct.controller getProducts', err);
      return next(err);
    }
  }
  static async getByCategory(req, res, next) {
    try {
      const category = req.params.category;
      const products = await Products.find({category}).populate({
        path: 'seller',
        select: 'firstName lastName email phoneNumber companyName',
      });
      res.status(200).json(products);
    } catch (err) {
      console.log('Error on the sellProduct.controller getByCategory', err);
      return next(err);
    }
  }
  static async getByProductId(req, res, next) {
    try {
      const productId = req.params.productId;
      const product = await Products.findById(productId).populate({
        path: 'seller',
        select: 'firstName lastName email phoneNumber companyName',
      });
      if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        return next(error);
      }
      res.status(200).json(product);
    } catch (err) {
      console.log('Error on the sellProduct.controller getByProductId', err);
      return next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const {productId} = req.body;
      const userId = req.user._id;
      const product = await Products.findById(productId);
      if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        return next(error);
      }

      if (product.user.toString() !== userId.toString()) {
        const error = new Error('You do not have permission to delete this product');
        error.status = 403;
        return next(error);
      }
      await Products.findByIdAndDelete(productId);
      await Promise.all(product.cloudinaryId.map((id) => cloudinary.uploader.destroy(id)));
      res.status(200).json({message: 'Product deleted successfully'});

    } catch (err) {
      console.log('Error on the sellProduct.controller deleteProduct', err);
      return next(err);
    }
  }
}

export default SellProductController;
