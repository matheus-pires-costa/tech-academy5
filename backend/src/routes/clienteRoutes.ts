import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const clienteController = new ClienteController();

// Repare no "validarToken": só quem fez login consegue acessar!
router.post('/', validarToken, clienteController.criar.bind(clienteController));
router.get('/', validarToken, clienteController.listar.bind(clienteController));

export default router;