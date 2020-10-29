import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.json({
      message: 'ok',
    });
  } catch (err) {
    res.status(409);
    res.json({
      message: err.toString(),
    });
  }
});

export default router;
