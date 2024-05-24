import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import connectDB from './config/database.config';
import userRoutes from './routes/user.routes';
import cartsRoutes from './routes/carts.routes';
import wishlistRoutes from './routes/wishlist.routes';
import sellerRoutes from './routes/seller.routes';
import accountRoutes from './routes/account.routes';
import errHandle from './middleware/error.middleware';
import notFound from './middleware/notFound.middleware';
//import logger from './middleware/logger.middleware';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });
connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(logger);

//Routes
app.use('/api/users', userRoutes);
//app.use('/api/apply', applyRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/accounts', accountRoutes);
//error handle
app.use(notFound);
app.use(errHandle);

const PORT = process.env.PORT || 2121;
app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);

export default app;
