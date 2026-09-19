import { Router } from 'express';
import { AgendamentoController } from '../controllers/AgendamentoController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const controller = new AgendamentoController();

router.post('/', validarToken, controller.criar.bind(controller));
router.get('/', validarToken, controller.listar.bind(controller));
router.put('/:id', validarToken, controller.atualizar.bind(controller));
router.delete('/:id', validarToken, controller.deletar.bind(controller));

export default router;