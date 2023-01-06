import express, { Request, Response } from 'express';
import { UserIdKey } from '../keys/UserId.key';

export class UserGuard {
  static configure(app: express.Application) {
    app.use((req: Request, res: Response, next) => {
      const UserId: string = req.header(UserIdKey) || '';

      if (!UserId || UserId == '') return res.status(401).send();
      else {
        req.body.userId = UserId;
        return next();
      }
    });
  }
}
