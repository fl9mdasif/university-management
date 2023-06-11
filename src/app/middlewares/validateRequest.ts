import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
// import { UserService } from '../modules/user/user.service'

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
