import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredodaapiacademy';

// Tipagem para dizer ao TypeScript o que esperamos encontrar dentro do Token
interface TokenPayload {
  id: number;
}

export function validarToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]; // Pega o token do cabeçalho
  
  if (!token) { 
    res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' }); 
    return; 
  }

  try {
    // Valida E decodifica o token para extrair as informações originais
    const decodificado = jwt.verify(token, JWT_SECRET) as TokenPayload; 
    
    // Guarda o ID do utilizador dentro do objeto da requisição
    (req as Request & { usuarioId?: number }).usuarioId = decodificado.id;
    
    next(); // Deixa o utilizador passar
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}