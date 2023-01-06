import { IController } from '../models';

import pollController from './pollController';

const Controllers: IController[] = [
  { route: '/poll', router: pollController.router },
];

export default Controllers;
