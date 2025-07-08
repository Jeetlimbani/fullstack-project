import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateAuth, validateOtp } from '../middlewares/validationMiddleware.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup/email-otp', validateAuth, authController.signupEmailOTP);
router.post('/verify/otp', validateOtp, authController.verifyOTP);
router.post('/login/email', validateAuth, authController.loginEmail);
router.post('/login/google', authController.googleAuthLogin);
router.get('/me', authenticateToken, authController.getUserInfo); // Protected route

export default router;
