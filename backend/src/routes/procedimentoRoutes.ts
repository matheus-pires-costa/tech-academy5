import { Router } from 'express';
import { ProcedimentoController } from '../controllers/ProcedimentoController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const controller = new ProcedimentoController();

router.post('/', validarToken, controller.criar.bind(controller));
router.get('/', validarToken, controller.listar.bind(controller));

export default router;