import { Request, Response } from 'express';

const fetch = (req: Request, res: Response) => {
  try {
    res.status(200);
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

export default fetch;
