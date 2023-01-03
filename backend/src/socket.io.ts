import express, { Request, Response } from 'express';
import { Server } from 'http';
import * as SocketIO from 'socket.io';

class AppSocket {
  private io: SocketIO.Server;

  connectedPools: any = {};

  constructor(server: Server, app: express.Application) {
    this.io = new SocketIO.Server(server, {
      cors: { origin: '*', methods: ['GET', 'POST', 'DELETE'] },
    });

    this.configureSockets();

    app.use((req: Request | any, res: Response, next) => {
      req.io = this.io;
      req.connectedPools = this.connectedPools;

      return next();
    });
  }

  private configureSockets(): void {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      socket.on('enter-pool', (userSocket: any) => {
        const { poolId } = userSocket;
        let id = poolId.toString();
        const pool = this.connectedPools[id];

        if (poolId && pool) {
          this.connectedPools[id]?.connectedUsers?.push(socket.id);
        } else {
          this.io.to(socket.id).emit('non-existing-pool');
        }
      });
    });
  }
}

export default AppSocket;
