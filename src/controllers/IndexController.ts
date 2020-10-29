import { Request, Response } from 'express';

class IndexController {
  public fetch = async (req: Request, res: Response) => {
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
  };
}

export default IndexController;
