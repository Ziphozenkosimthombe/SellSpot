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

      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: 'Password must be at least 8 characters' });
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
      console.log('error on the auth.controllers signup', err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ''
      );

      if (!user || !isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      generateTokenAndSetCookie(user._id, res);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log('Error on the auth.controller login', err);
    }
  }
  static async logout(_req, res) {
    try {
      res.cookie('jwt', '', { maxAge: 1 });
      res.status(201).json({ message: 'Logged out successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log('Error on the auth.controller logout', err);
    }
  }
}

export default AuthController;
