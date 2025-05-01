import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // mais padrão

  const token = authHeader && authHeader.split(' ')[1]; // Espera formato: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    req.user = decoded; // Agora o req.user tem os dados do payload do JWT
    next();
  });
};
