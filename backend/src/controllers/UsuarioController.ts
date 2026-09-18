import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await usuarioService.cadastrar(req.body);
      res.status(201).json({ message: 'Criado com sucesso', id: usuario.id });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Erro interno';
      res.status(400).json({ erro: msg });
    }
  }
}