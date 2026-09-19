import { Request, Response } from 'express';
import { ProcedimentoService } from '../services/ProcedimentoService';

const procedimentoService = new ProcedimentoService();

export class ProcedimentoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const proc = await procedimentoService.criar(req.body);
      res.status(201).json(proc);
    } catch (e: unknown) {
      res.status(400).json({ erro: e instanceof Error ? e.message : 'Erro' });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    res.status(200).json(await procedimentoService.listar());
  }
}