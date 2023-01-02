import { Router } from 'express';

export type Controller = {
  route: string;
  router: Router;
};
