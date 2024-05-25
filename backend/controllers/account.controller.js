import User from '../models/User.models';
import cloudinary from '../middleware/cloudinary.middleware';
import Seller from '../models/Seller.model';
import Carts from '../models/Carts.models';
import List from '../models/List.models';
import Products from '../models/Products.models';
import bcrypt from 'bcryptjs';
class AccountController {
  static async getAccount(req, res, next) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log('Error on the account.controller getAccount', err);
      return next(err);
    }
  }
  static async updateAccount(req, res, next) {
    try {
      const { username, phoneNumber, currentPassword, newPassword } = req.body;
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        return next(error);
      }
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        const error = new Error('Wrong password');
        error.status = 400;
        return next(error);
      }
      user.username = username || user.username;
      user.phoneNumber = phoneNumber || user.phoneNumber;

      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }
      await user.save();
      return res
        .status(200)
        .json({ message: 'Account successful updated', user });
    } catch (err) {
      console.log('Error on the account.controller updateAccount', err);
      return next(err);
    }
  }
  static async deleteAccount(req, res, next) {
    try {
      const userId = req.user._id;

      // Delete user account
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        return next(error);
      }

      // Delete seller account if exists
      const seller = await Seller.findOneAndDelete({ user: userId });

      // Delete cart associated with the user
      await Carts.findOneAndDelete({ user: userId });

      // Delete wishlist associated with the user
      await List.findOneAndDelete({ user: userId });

      // Fetch products sold by the user
      const products = await Products.find({
        seller: seller ? seller._id : userId,
      });

      // Delete images from Cloudinary
      for (const product of products) {
        for (const imageId of product.cloudinaryId) {
          await cloudinary.uploader.destroy(imageId);
        }
      }

      // Delete products sold by the user
      await Products.deleteMany({ seller: seller ? seller._id : userId });

      return res.status(200).json({ message: 'Account successfully deleted' });
    } catch (err) {
      console.log('Error on the account.controller deleteAccount', err);
      return next(err);
    }
  }
}

export default AccountController;
