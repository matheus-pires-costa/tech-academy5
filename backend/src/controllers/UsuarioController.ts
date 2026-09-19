import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';
import { tratarErro } from '../utils/erroHelper';

const service = new UsuarioService();

export class UsuarioController {
  async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await service.cadastrar(req.body);
      
      // Remove a senha criptografada do retorno por segurança
      const { senha, ...usuarioSemSenha } = usuario;
      
      res.status(201).json(usuarioSemSenha);
    } catch (e) {
      tratarErro(e as Error, res);
    }
  }
}