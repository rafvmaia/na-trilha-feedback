import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import feedbackRoutes from './routes/feedbackRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz de teste
app.get('/', (req, res) => {
    res.status(200).send('API Na Trilha Feedback está Online 🚀');
  });
  

// Rotas da API
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/auth', authRoutes);

// Subir o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
