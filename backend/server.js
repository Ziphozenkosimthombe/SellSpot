import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/database.config';
import userRoutes from './routes/user.routes';
import applyRoutes from './routes/seller.routes';
import errHandle from './middleware/error.middleware';
import notFound from './middleware/notFound.middleware';
//import logger from './middleware/logger.middleware';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: `./config/${envFile}` });
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

//app.use(logger);

//Routes
app.use('/api/users', userRoutes);
app.use('/api/apply', applyRoutes);

//error handle
app.use(notFound);
app.use(errHandle);

const PORT = process.env.PORT || 2121;
app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);

export default app;
