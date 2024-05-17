import express from 'express';
import AuthController from '../controllers/auth.controllers';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/logout', AuthController.logout);

export default router;
