import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { validarToken } from '../middlewares/authMiddleware';

const router = Router();
const controller = new UsuarioController();


router.post('/cadastrar', controller.cadastrar.bind(controller));
router.put('/:id', validarToken, controller.atualizar.bind(controller));

export default router;