import Carts from '../models/Carts.models';
import Products from '../models/Products.models';

class CartsController {
  static async getCart(req, res, next) {
    try {
      const userId = req.user._id;
      const cart = await Carts.findOne({ user: userId }).populate({
        path: 'items.product',
        select: 'title description price stock_quantity images',
        populate: {
          path: 'seller',
          select: 'firstName lastName email phoneNumber companyName',
        },
      });
      return res.status(200).json(cart);
    } catch (err) {
      console.log('Error in CartsController getCart:', err);
      return next(err);
    }
  }
  static async addItemToCart(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id;

      // Fetch the product by ID
      const product = await Products.findById(productId);
      console.log(product);
      if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        return next(error);
      }

      // Find or create the user's cart
      let cart = await Carts.findOne({ user: userId });
      if (!cart) {
        cart = new Carts({
          user: userId,
          items: [],
          totalPrice: 0,
        });
      }

      // Add item to the cart
      await cart.addItem(product, quantity);
      return res.status(201).json(cart);
    } catch (err) {
      console.log('Error in CartsController addItemToCart:', err);
      return next(err);
    }
  }

  static async removeItemFromCart(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      const cart = await Carts.findOne({ user: userId });
      if (!cart) {
        const error = new Error('Cart not found');
        error.status = 404;
        return next(error);
      }
      await cart.removeItem(productId);
      return res.status(200).json(cart);
    } catch (err) {
      console.log('Error in CartsController removeItemFromCart:', err);
      return next(err);
    }
  }
}

export default CartsController;
