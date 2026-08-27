import express from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import userRoutes from '../modules/user/user.route.js';
import jobRoutes from '../modules/job/job.route.js';
import companyRoutes from '../modules/company/company.route.js';
import applicationRoutes from '../modules/application/application.route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/users', userRoutes);
router.use('/job', jobRoutes);
router.use('/company', companyRoutes);
router.use('/application', applicationRoutes);

export default router;
