import User from '../models/User.models';
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
}

export default AccountController;
