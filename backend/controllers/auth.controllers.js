import User from '../models/User.models';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateTokeAndSetCookie';

class AuthController {
  static async signup(req, res, next) {
    try {
      const {username, email, password} = req.body;
      const user = await User.findOne({$or: [{username}, {email}]});

      if (user) {
        const error = new Error('User already exists');
        error.status = 400;
        return next(error);
      }
      if (username.length < 5) {
        const error = new Error('Username must be at least 5 characters long');
        error.status = 400;
        return next(error);
      }

      if (password.length < 8) {
        const error = new Error('Password must be at least 8 characters long');
        error.status = 400;
        return next(error);
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
        const token = generateTokenAndSetCookie(newUser._id, res);
        return res.status(201).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          token,
        });
      }
      const error = new Error('Invalid user data');

      error.status = 400;
      return next(error);
    } catch (err) {
      return next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ''
      );

      if (!user || !isPasswordCorrect) {
        const error = new Error('Invalid credentials');
        error.status = 400;
        return next(error);
      }

      const token = generateTokenAndSetCookie(user._id, res);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } catch (err) {
      console.log('Error on the auth.controller login', err);
      return next(err);
    }
  }
  static async logout(_req, res, next) {
    try {
      res.cookie('jwt', '', {maxAge: 1});
      res.status(201).json({message: 'Logged out successfully'});
    } catch (err) {
      console.log('Error on the auth.controller logout', err);
      return next(err);
    }
  }
}

export default AuthController;
