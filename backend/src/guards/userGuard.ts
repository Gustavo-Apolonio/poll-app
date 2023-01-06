import express, { NextFunction, Response } from 'express';

import { IRequest } from '../models';
import { ErrorStatus } from '../enums';
import { UserIdKey } from '../keys';

export class UserGuard {
  static configure(app: express.Application) {
    app.use((req: IRequest, res: Response, next: NextFunction) => {
      const UserId: string = req.header(UserIdKey) || '';

      if (!UserId || UserId == '')
        return res.status(ErrorStatus.Forbidden).send();
      else {
        req.body.userId = UserId;
        return next();
      }
    });
  }
}
