import { Router } from 'express';
import { AgendamentoController } from '../controllers/AgendamentoController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const controller = new AgendamentoController();

router.post('/', validarToken, controller.criar.bind(controller));
router.get('/', validarToken, controller.listar.bind(controller));

export default router;