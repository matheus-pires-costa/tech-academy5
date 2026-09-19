import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();
const controller = new UsuarioController();

// POST /usuarios/cadastrar
router.post('/cadastrar', controller.cadastrar.bind(controller));

export default router;