import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredodaapiacademy';


interface TokenPayload {
  id: number;
}

export function validarToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]; 
  
  if (!token) { 
    res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' }); 
    return; 
  }

  try {
    
    const decodificado = jwt.verify(token, JWT_SECRET) as TokenPayload; 
    
    
    (req as Request & { usuarioId?: number }).usuarioId = decodificado.id;
    
    next(); 
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}