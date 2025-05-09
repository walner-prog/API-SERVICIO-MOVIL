// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: 'Token no válido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 👈 Aquí debería incluir { id: ..., username: ... }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
