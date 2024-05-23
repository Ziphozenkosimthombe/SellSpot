import CreateProduct from '../models/SellProduct.models';
import cloudinary from '../middleware/cloudinary.middleware';
import Seller from '../models/Seller.model';
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
      const { name, description, price, category, stock_quantity } = req.body;

      const userId = req.user._id;
      const user = await Seller.findOne({ user: userId });
      const sellerId = user._id;
      console.log(user);
      if (!sellerId) {
        const error = new Error(
          'you can nto sell on the platform just please register to sell first'
        );
        error.status = 400;
        return next(error);
      }
      const newSellProduct = new CreateProduct({
        name,
        description,
        price,
        category,
        images: imageUrls, // Store image URLs
        cloudinaryId: cloudinaryIds, // Store Cloudinary IDs
        stock_quantity,
        seller: sellerId,
      });

      await newSellProduct.save();

      if (newSellProduct) {
        res.status(201).json({
          _id: newSellProduct._id,
          name: newSellProduct.name,
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
      const products = await CreateProduct.find().populate({
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
      const products = await CreateProduct.find({ category }).populate({
        path: 'seller',
        select: 'firstName lastName email phoneNumber companyName',
      });
      res.status(200).json(products);
    } catch (err) {
      console.log('Error on the sellProduct.controller getByCategory', err);
      return next(err);
    }
  }
}

export default SellProductController;
