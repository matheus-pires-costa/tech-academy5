import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();


export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;
      const resultado = await authService.autenticar(email, senha);
      res.status(200).json(resultado);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Erro no login';
      res.status(401).json({ erro: msg });
    }
  }
}