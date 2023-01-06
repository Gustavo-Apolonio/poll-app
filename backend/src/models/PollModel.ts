import { IUser } from './UserModel';

export interface IPoll {
  createdOn: Date;
  id: string;
  connectedUsers: IUser[];
}
