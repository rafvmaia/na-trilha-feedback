import express from 'express';
import { submitFeedback, getAllFeedbacks, getFeedbackById } from '../controllers/feedbackController.js';
import verifyToken from '../middlewares/authMiddleware.js';


const router = express.Router();

// Público - enviar feedback
router.post('/', submitFeedback);

// Protegido - listar todos os feedbacks
router.get('/', verifyToken, getAllFeedbacks);

// Protegido - buscar feedback específico por ID
router.get('/:id', verifyToken, getFeedbackById);

export default router;
