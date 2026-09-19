import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredodaapiacademy';

export function validarToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]; // Pega o token do cabeçalho
  
  if (!token) { 
    res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' }); 
    return; 
  }

  try {
    jwt.verify(token, JWT_SECRET); // Valida se o token é verdadeiro
    next(); // Deixa o usuário passar
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}