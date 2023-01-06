import { Request } from 'express';
import * as SocketIO from 'socket.io';

import { IPoll } from './PollModel';

export interface IRequest extends Request {
  io?: SocketIO.Server;
  connectedPolls?: IPoll[];
}
