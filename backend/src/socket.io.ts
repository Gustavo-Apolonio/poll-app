import express, { Request, Response } from 'express';
import { Server } from 'http';
import * as SocketIO from 'socket.io';

class AppSocket {
  private io: SocketIO.Server;

  connectedPools: any = {};

  constructor(server: Server, app: express.Application) {
    this.io = new SocketIO.Server(server);

    this.configureSockets();

    app.use((req: Request | any, res: Response, next) => {
      req.io = this.io;
      req.connectedPools = this.connectedPools;

      return next();
    });
  }

  private configureSockets(): void {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      const { poolId } = socket.handshake.query;
      if (poolId) {
        let id = poolId.toString();
        this.connectedPools[id]?.push(socket.id);
      }
    });
  }

  public configureNewSocket(
    on: string,
    callback: (socket: SocketIO.Socket) => {}
  ): void {
    this.io.on(on, callback);
  }
}

export default AppSocket;
