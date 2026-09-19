import { Response } from 'express';

export function tratarErro(erro: Error, res: Response): void {
  const msg = erro.message || 'Erro interno do servidor';
  
  const status = msg.includes('não encontrado') ? 404 : 400;
  res.status(status).json({ erro: msg });
}