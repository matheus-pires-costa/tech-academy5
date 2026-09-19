import { Response } from 'express';

export function tratarErro(erro: Error, res: Response): void {
  const msg = erro.message || 'Erro interno do servidor';
  // Se o erro for de ID inexistente, devolve 404. Caso contrário, 400.
  const status = msg.includes('não encontrado') ? 404 : 400;
  res.status(status).json({ erro: msg });
}