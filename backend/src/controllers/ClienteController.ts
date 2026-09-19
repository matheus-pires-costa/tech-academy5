import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';
import { tratarErro } from '../utils/erroHelper';

const service = new ClienteService();

export class ClienteController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const cliente = await service.criar(req.body);
      res.status(201).json(cliente);
    } catch (e) { tratarErro(e as Error, res); }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const pagina = Number(req.query.pagina) || 1;
      const limite = Number(req.query.limite) || 10;
      const clientes = await service.listar(pagina, limite);
      res.status(200).json(clientes);
    } catch (e) { tratarErro(e as Error, res); }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const cliente = await service.atualizar(Number(req.params.id), req.body);
      res.status(200).json(cliente);
    } catch (e) { tratarErro(e as Error, res); }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      await service.deletar(Number(req.params.id));
      res.status(204).send();
    } catch (e) { tratarErro(e as Error, res); }
  }
}