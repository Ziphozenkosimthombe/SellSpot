import express from 'express';
import AuthController from '../controllers/auth.controllers';

const router = express.Router();

//router.post('/login', login);
router.post('/signup', AuthController.signup);
//router.post('/logout', logout);

export default router;
