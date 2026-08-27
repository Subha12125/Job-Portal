import express from 'express';
import {
  applyToJobController,
  getJobApplicantsController,
  getCandidateApplicationsController,
  updateApplicationStatusController,
} from './application.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', protect, authorize('candidate', 'admin'), applyToJobController);
router.get('/my-applications', protect, getCandidateApplicationsController);
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getJobApplicantsController);
router.put('/:id/status', protect, authorize('recruiter', 'admin'), updateApplicationStatusController);

export default router;
