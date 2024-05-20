import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    address: [
      {
        streetAddress: {
          type: String,
          default: '',
        },
        Suburb: {
          type: String,
          default: '',
        },
        city: {
          type: String,
          default: '',
        },
        province: {
          type: String,
          default: '',
        },
        country: {
          type: String,
          default: '',
        },
        postalCode: {
          type: String,
          minLength: 4,
          default: '',
        },
      },
    ],
    is_seller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
