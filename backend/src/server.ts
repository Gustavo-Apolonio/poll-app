import app from './app';
import Controllers from './controllers';

import { Controller } from './models';

Controllers.forEach((controller: Controller) => {
  app.configureNewRoute(controller.route, controller.router);
});

app.startApp();
