import express from 'express';
import {
  createUserController,
  getUserByIdController,
  getUserByEmailController,
  getAllUsersController,
  updateProfileController,
} from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.put('/profile', protect, updateProfileController);
router.get('/all', getAllUsersController);
router.get('/email/:email', getUserByEmailController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);

export default router;