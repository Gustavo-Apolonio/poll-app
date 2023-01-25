import { IVote } from './Vote';

export interface IUser {
  id: string;
  connectionId: string;
  vote?: IVote;
}
