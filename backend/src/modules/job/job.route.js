import express from 'express';
import {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  getRecruiterJobsController,
  updateJobController,
  deleteJobController,
  getSavedJobsController,
  saveJobController,
} from './job.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', getAllJobsController);
router.get('/recruiter/my-jobs', protect, authorize('recruiter', 'admin'), getRecruiterJobsController);
router.get('/saved', protect, getSavedJobsController);
router.post('/save/:id', protect, saveJobController);
router.get('/:id', getJobByIdController);
router.post('/', protect, authorize('recruiter', 'admin'), createJobController);
router.put('/:id', protect, authorize('recruiter', 'admin'), updateJobController);
router.delete('/:id', protect, authorize('recruiter', 'admin'), deleteJobController);

export default router;
