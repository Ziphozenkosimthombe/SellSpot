import CreateProduct from '../models/SellProduct.models';
//import User from  '../models/User.models'
import cloudinary from '../middleware/cloudinary.middleware';

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

      // Get other form data
      const { name, description, price, category, stock_quantity } = req.body;
      const user = await CreateProduct.findOne({ seller });
      if (!user) {
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
}

export default SellProductController;
