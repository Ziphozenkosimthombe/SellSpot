import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    cloudinaryId: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-stock', 'out-of-stock', 'discontinued'],
      default: 'in-stock',
    },
  },
  { timestamps: true }
);

const Products = mongoose.model('Products', ProductsSchema);
export default Products;
