import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cartsSchema.methods.addItem = async function (product, quantity) {
  const existingItemIndex = this.items.findIndex(
    (item) => item.product.toString() === product._id.toString()
  );

  if (existingItemIndex > -1) {
    this.items[existingItemIndex].quantity += quantity;
    this.items[existingItemIndex].price += quantity * product.price;
  } else {
    this.items.push({
      product: product._id,
      quantity,
      price: product.price * quantity,
    });
  }
  this.totalPrice += product.price * quantity;
  return this.save();
};

cartsSchema.methods.removeItem = async function (productId) {
  const itemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (itemIndex > -1) {
    const item = this.items[itemIndex];
    this.totalPrice -= item.price;
    this.items.splice(itemIndex, 1);
    return this.save();
  }
};

const Carts = mongoose.model('Carts', cartsSchema);
export default Carts;
