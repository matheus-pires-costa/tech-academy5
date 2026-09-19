import { Request, Response } from 'express';
import { AgendamentoService } from '../services/AgendamentoService';
import { tratarErro } from '../utils/erroHelper';

const service = new AgendamentoService();

export class AgendamentoController {
  async criar(req: Request, res: Response): Promise<void> {
    try { res.status(201).json(await service.criar(req.body)); } 
    catch (e) { tratarErro(e as Error, res); }
  }

  async listar(req: Request, res: Response): Promise<void> {
    const pagina = Number(req.query.pagina) || 1;
    const limite = Number(req.query.limite) || 10;
    res.status(200).json(await service.listar(pagina, limite));
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try { res.status(200).json(await service.atualizar(Number(req.params.id), req.body)); } 
    catch (e) { tratarErro(e as Error, res); }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try { await service.deletar(Number(req.params.id)); res.status(204).send(); } 
    catch (e) { tratarErro(e as Error, res); }
  }
}