import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const clienteController = new ClienteController();


router.post('/', validarToken, clienteController.criar.bind(clienteController));
router.get('/', validarToken, clienteController.listar.bind(clienteController));


router.put('/:id', validarToken, clienteController.atualizar.bind(clienteController));
router.delete('/:id', validarToken, clienteController.deletar.bind(clienteController));

export default router;