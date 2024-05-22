import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          const southAfricaPhoneNumberRegex = /^\+27[0-9]{9}$/;
          return southAfricaPhoneNumberRegex.test(value);
        },
        message:
          'Invalid phone number format. Please include the country code (+27) followed by 9 digits.',
      },
    },
    findUs: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: '',
    },
    socialMedia: {
      type: [String],
      default: [],
    },
    located: {
      type: String,
      required: true,
    },
    address: [
      {
        streetAddress: {
          type: String,
          required: true,
        },
        Suburb: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        province: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          minLength: 4,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;
