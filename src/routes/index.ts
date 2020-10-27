import { Router } from 'express';
import IndexController from '../controllers/IndexController';

const router = Router();
const indexController = new IndexController();

router.get('/', indexController.fetch);

export default router;
