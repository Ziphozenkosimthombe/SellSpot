import Seller from '../models/Seller.model';
import User from '../models/User.models';

class ApplyController {
  static async applyingToSell(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        findUs,
        companyName,
        category,
        located,
        address,
      } = req.body;

      //      const userId = req.user._id;
      const userId = req.params.id;
      //find user by id
      const user = await User.findById(userId);
      if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        return next(error);
      }
      //check if email matches
      if (user.email !== email) {
        const error = new Error(
          'Email must match the email you use to register'
        );
        error.status = 400;
        return next(error);
      }
      // Check if a seller already exists with the given userId
      const existingSeller = await Seller.findOne({ user });
      if (existingSeller) {
        const error = new Error('Seller already exists');
        error.status = 400;
        return next(error);
      }
      // Check for existing seller with the same email, phone number, or company name
      const duplicateSeller = await Seller.findOne({
        $or: [{ email }, { phoneNumber }, { companyName }],
      });
      if (duplicateSeller) {
        const error = new Error(
          'Email or Phone number or Company name already exist'
        );
        error.status = 400;
        return next(error);
      }

      const newUser = new Seller({
        user: userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        findUs,
        companyName,
        category,
        located,
        address,
      });
      await newUser.save();

      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            is_seller: true,
            ...(address ? { address } : {}),
            ...(phoneNumber ? { phoneNumber } : {}),
          },
        },
        { new: true }
      );

      if (newUser) {
        res.status(201).json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          findUs: newUser.findUs,
          companyName: newUser.companyName,
          category: newUser.category,
          located: newUser.located,
          address: newUser.address,
          userId: newUser.user,
        });
      } else {
        const error = new Error('Invalid user data');
        error.status = 400;
        return next(error);
      }
    } catch (err) {
      console.log('server error base on the applying', err);
      return next(err);
    }
  }
}

export default ApplyController;
