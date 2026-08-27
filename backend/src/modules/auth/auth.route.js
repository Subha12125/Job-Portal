import express from 'express';
import {
  registerController,
  loginController,
  getMeController,
  forgotPasswordController,
  resetPasswordController,
} from './auth.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', protect, getMeController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);

export default router;
