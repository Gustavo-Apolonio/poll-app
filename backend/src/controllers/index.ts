import { IController } from '../models';

import pollController from './pollController';
import voteController from './voteController';

const Controllers: IController[] = [
  { route: '/poll', router: pollController.router },
  { route: '/vote', router: voteController.router },
];

export default Controllers;
