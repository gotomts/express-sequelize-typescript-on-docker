import { Router } from 'express';

import IndexController from '../controllers/IndexController';

const router = Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: タイトルを返却する
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: タイトル
 */
router.get('/', IndexController);

export default router;
