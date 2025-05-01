import express from 'express';
import { loginUser, refreshToken, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.post('/register', registerUser);

export default router;
