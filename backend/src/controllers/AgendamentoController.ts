import { Request, Response } from 'express';
import { AgendamentoService } from '../services/AgendamentoService';

const agendamentoService = new AgendamentoService();

export class AgendamentoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const agendamento = await agendamentoService.criar(req.body);
      res.status(201).json(agendamento);
    } catch (e: unknown) {
      res.status(400).json({ erro: e instanceof Error ? e.message : 'Erro' });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    res.status(200).json(await agendamentoService.listar());
  }
}