import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';

const clienteService = new ClienteService();

export class ClienteController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const cliente = await clienteService.criar(req.body);
      res.status(201).json(cliente);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Erro ao criar cliente';
      res.status(400).json({ erro: msg });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    const clientes = await clienteService.listar();
    res.status(200).json(clientes);
  }
}