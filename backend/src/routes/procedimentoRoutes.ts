import { Router } from 'express';
import { ProcedimentoController } from '../controllers/ProcedimentoController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const procController = new ProcedimentoController();

router.post('/', validarToken, procController.criar.bind(procController));
router.get('/', validarToken, procController.listar.bind(procController));
router.put('/:id', validarToken, procController.atualizar.bind(procController));
router.delete('/:id', validarToken, procController.deletar.bind(procController));

export default router;