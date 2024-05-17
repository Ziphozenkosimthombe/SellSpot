import User from '../models/User.models';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateTokeAndSetCookie';

class AuthController {
  static async signup(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        return res.status(201).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        });
      }
      res.status(400).json({ message: 'Invalid user data' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default AuthController;
