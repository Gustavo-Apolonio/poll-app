import { IUser } from './UserModel';
import { IVote } from './Vote';

export interface IPoll {
  createdOn: Date;
  id: string;
  connectedUsers: IUser[];
  votes: IVote[];
}
