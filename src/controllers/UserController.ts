import { Request, Response } from 'express';
import { User } from '../entity/User';

import UserRepository from '../infrastructures/UserRepository';

class UserController {
  public fetchAll = async (req: Request, res: Response) => {
    try {
      const userRepository = new UserRepository();
      const results = await userRepository.fetchAll();

      res.status(200);
      res.json({
        result: results,
        message: 'ok',
      });
    } catch (err) {
      res.status(409);
      res.json({
        message: err.toString(),
      });
    }
  };

  public fetch = async (req: Request, res: Response) => {
    console.log({ params: req.params });
    try {
      const userRepository = new UserRepository();
      const results = await userRepository.fetch(req.params.id);

      if (results) {
        res.status(200);
        res.json({
          result: results,
          message: 'ok',
        });
      } else {
        res.status(204);
        res.json({
          message: 'No User',
        });
      }
    } catch (err) {
      res.status(409);
      res.json({
        message: err.toString(),
      });
    }
  };

  public save = async (req: Request, res: Response) => {
    console.log({ body: req.body });
    try {
      const user = new User(
        req.body.firstname,
        req.body.lastname,
        (req.body.age) ? req.body.age : undefined,
      );
      const userRepository = new UserRepository();
      const results = await userRepository.save(user);

      res.status(200);
      res.json({
        result: results,
        message: 'ok',
      });
    } catch (err) {
      res.status(409);
      res.json({
        message: err.toString(),
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    console.log({ params: req.params });
    try {
      const user = await User.findOneOrFail(req.params.id);
      User.merge(user, req.body);
      const results = await User.save(user);

      res.json({
        result: results,
        message: 'ok',
      });
    } catch (err) {
      res.status(409);
      res.json({
        message: err.toString(),
      });
    }
  };

  public delete = async (req: Request, res: Response) => {
    console.log({ params: req.params });
    try {
      const results = await User.delete(req.params.id);

      res.json({
        result: results,
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

export default UserController;
