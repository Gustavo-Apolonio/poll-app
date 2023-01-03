import express, { Request, Response } from 'express';
import { Server } from 'http';
import * as SocketIO from 'socket.io';

class AppSocket {
  private io: SocketIO.Server;

  connectedPolls: any = {};

  constructor(server: Server, app: express.Application) {
    this.io = new SocketIO.Server(server, {
      cors: { origin: '*', methods: ['GET', 'POST', 'DELETE'] },
    });

    this.configureSockets();

    app.use((req: Request | any, res: Response, next) => {
      req.io = this.io;
      req.connectedPolls = this.connectedPolls;

      return next();
    });
  }

  private configureSockets(): void {
    this.io.on('connection', (socket: SocketIO.Socket) => {
      socket.on('enter-poll', (userSocket: any) => {
        const { pollId } = userSocket;
        let id = pollId.toString();
        const poll = this.connectedPolls[id];

        if (pollId && poll) {
          this.connectedPolls[id]?.connectedUsers?.push(socket.id);
        } else {
          this.io.to(socket.id).emit('non-existing-poll');
        }
      });
    });
  }
}

export default AppSocket;
