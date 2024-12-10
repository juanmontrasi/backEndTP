import pkg from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const jwt = pkg;
const secret = process.env.SECRET
const ROLES = {
  ADMIN: 1,
}

export const generateToken = (user) => {
  return jwt.sign(user, secret, { expiresIn: '1h' })
}

export const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  } 
  const token = authHeader.split(' ')[1]
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token no válido' })
    }
    if (user.tipo_usuario !== ROLES.ADMIN) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' })
    }
    req.user = user
    next()
  });
}