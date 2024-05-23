import mongoose from 'mongoose';

const SellProductSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
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

const CreateProduct = mongoose.model('SellProduct', SellProductSchema);
export default CreateProduct;
