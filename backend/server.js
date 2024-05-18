import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/database.config';
import userRoutes from './routes/user.routes';
import applyRoutes from './routes/seller.routes';
import errHandle from './middleware/error.middleware'
import notFound from './middleware/notfound.middleware'
dotenv.config({ path: './config/.env' });
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/apply', applyRoutes);

//error handle
app.use(notFound)
app.use(errHandle)


app.listen(process.env.PORT, () =>
  console.log('server is running at http://localhost:5000')
);
