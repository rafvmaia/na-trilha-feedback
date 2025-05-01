import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';
import bcrypt from 'bcrypt';

// Função de login
export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    // Criar Access Token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Criar Refresh Token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no login.' });
  }
};

// Função para renovar o Access Token
export const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Token de atualização não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Gerar novo Access Token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    res.status(403).json({ message: 'Refresh token inválido ou expirado.' });
  }
};

// Função de registro (novo usuário)
export const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = await createUser({ nome, email, senhaHash });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno no registro.' });
  }
};
