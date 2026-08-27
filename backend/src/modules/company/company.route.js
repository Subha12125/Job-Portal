import express from 'express';
import {
  createCompanyController,
  getAllCompaniesController,
  getCompanyByIdController,
  getMyCompaniesController,
  updateCompanyController,
} from './company.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', getAllCompaniesController);
router.get('/owner/my-companies', protect, authorize('recruiter', 'admin'), getMyCompaniesController);
router.get('/:id', getCompanyByIdController);
router.post('/', protect, authorize('recruiter', 'admin'), createCompanyController);
router.put('/:id', protect, authorize('recruiter', 'admin'), updateCompanyController);

export default router;
