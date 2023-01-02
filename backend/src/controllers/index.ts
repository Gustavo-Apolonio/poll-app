import { Controller } from '../models/ControllerModel';

import poolController from './poolController';

const Controllers: Controller[] = [
  { route: '/pool', router: poolController.router },
];

export default Controllers;
