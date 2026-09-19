import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';
import { tratarErro } from '../utils/erroHelper';

const service = new UsuarioService();

export class UsuarioController {
  async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await service.cadastrar(req.body);

      
      const { senha, ...usuarioSemSenha } = usuario;

      res.status(201).json(usuarioSemSenha);
    } catch (e) {
      tratarErro(e as Error, res);
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      
      const requisicaoAuth = req as Request & { usuarioId?: number };
      const idParametro = Number(req.params.id);

      if (requisicaoAuth.usuarioId && requisicaoAuth.usuarioId !== idParametro) {
        res.status(403).json({ erro: 'Apenas pode editar o seu próprio perfil' });
        return;
      }

      const usuario = await service.atualizar(idParametro, req.body);
      res.status(200).json({ mensagem: 'Perfil atualizado com sucesso', id: usuario.id });
    } catch (e) {
      tratarErro(e as Error, res);
    }
  }
}