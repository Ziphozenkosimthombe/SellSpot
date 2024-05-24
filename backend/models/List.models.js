import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', listSchema);
export default List;
