import Seller from '../models/Seller.model';
import User from '../models/User.models';

class ApplyController {
  static async applyingToSell(req, res) {
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
      const userId = req.params.id;

      //find user by id
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      //check if email matches
      if (user.email !== email) {
        return res
          .status(400)
          .json({ message: 'Email must match the email you use to register' });
      }
      // Check if a seller already exists with the given userId
      const existingSeller = await Seller.findOne({ userId });
      if (existingSeller) {
        return res.status(400).json({ message: 'Seller already exists' });
      }
      // Check for existing seller with the same email, phone number, or company name
      const duplicateSeller = await Seller.findOne({
        $or: [{ email }, { phoneNumber }, { companyName }],
      });
      if (duplicateSeller) {
        return res.status(400).json({
          message: 'Email or Phone number or Company name already exist',
        });
      }

      const newUser = new Seller({
        firstName,
        lastName,
        email,
        phoneNumber,
        findUs,
        companyName,
        category,
        located,
        address,
        userId,
      });
      await newUser.save();

      // update user to be a seller
      if (!user.is_seller) {
        user.is_seller = true;
      }
      if (user.address.length === 0) {
        user.address = newUser.address;
      }
      await user.save();

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
          userId: newUser.userId,
        });
      } else {
        return res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (err) {
      console.log('server error base on the applying', err);
      res.status(500).json({ message: err.message });
    }
  }
}

export default ApplyController;
