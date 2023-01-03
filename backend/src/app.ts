import express, { Router } from 'express';
import cors from 'cors';
import { Server, createServer } from 'http';

import AppSocket from './socket.io';

class App {
  public app: express.Application;
  public server: Server;
  public socket: AppSocket;
  public PORT: number = 5000;
  public HOSTNAME: string = 'http://localhost';

  constructor(port: number = 5000, hostname: string = 'http://localhost') {
    this.PORT = port;
    this.HOSTNAME = hostname;

    this.configureRoutes();

    this.server = createServer(this.app);

    this.socket = new AppSocket(this.server, this.app);
  }

  private configureRoutes(): void {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public configureNewRoute(route: string, controller: Router): void {
    this.app.use(route, controller);
  }

  public startApp(): void {
    this.server.listen(this.PORT, () =>
      console.log(`Server running on http://${this.HOSTNAME}:${this.PORT}/`)
    );
  }
}

export default new App();
