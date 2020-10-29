import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.get('/', userController.fetchAll);
router.get('/:id', userController.fetch);

router.post('/', userController.save);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
