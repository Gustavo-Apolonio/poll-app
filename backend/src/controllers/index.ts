import { Controller } from '../models/ControllerModel';

import pollController from './pollController';

const Controllers: Controller[] = [
  { route: '/poll', router: pollController.router },
];

export default Controllers;
