import app from './app';
import Controllers from './controllers';

import { IController } from './models';

Controllers.forEach((controller: IController) => {
  app.configureNewRoute(controller.route, controller.router);
});

app.startApp();
