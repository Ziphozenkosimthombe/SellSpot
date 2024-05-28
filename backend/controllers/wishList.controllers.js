import List from '../models/List.models';
import Products from '../models/Products.models';

class WishListController {
  static async getWhishList(req, res, next) {
    try {
      const userId = req.user._id;
      const wishList = await List.findOne({ user: userId }).populate({
        path: 'items.product',
        select: 'title description price stock_quantity images status',
        populate: {
          path: 'seller',
          select: 'firstName lastName email phoneNumber companyName',
        },
      });
      if (!wishList) {
        const error = new Error('WishList not found');
        error.status = 404;
        return next(error);
      } else {
        return res.status(200).json(wishList);
      }
    } catch (err) {
      console.log('Error on the whiteList.controller createList', err);
      return next(err);
    }
  }

  static async addItemToWishList(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      const product = await Products.findById(productId);
      if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        return next(error);
      }

      let wishList = await List.findOne({ user: userId });
      if (!wishList) {
        wishList = new List({
          user: userId,
          items: [],
        });
      }

      const itemExist = wishList.items.some(
        (item) => item.product.toString() === productId
      );
      if (itemExist) {
        const error = new Error('Product already in the wishList');
        error.status = 400;
        return next(error);
      }
      wishList.items.push({ product: productId });
      await wishList.save();
      return res.status(201).json(wishList);
    } catch (err) {
      console.log('Error on the whiteList.controller addItemToWishList', err);
      return next(err);
    }
  }

  static async removeItemFromWishList(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      const wishList = await List.findOne({ user: userId });
      if (!wishList) {
        const error = new Error('WishList not found');
        error.status = 404;
        return next(error);
      }
      const itemIndex = wishList.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex === -1) {
        const error = new Error('Product not found in the wishList');
        error.status = 404;
        return next(error);
      }
      wishList.items.splice(itemIndex, 1);
      await wishList.save();
      return res.status(200).json(wishList);
    } catch (err) {
      console.log(
        'Error on the whiteList.controller removeItemFromWishList',
        err
      );
      return next(err);
    }
  }
}

export default WishListController;
