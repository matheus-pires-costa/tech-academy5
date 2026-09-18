import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/cadastro', usuarioController.cadastrar.bind(usuarioController));

export default router;