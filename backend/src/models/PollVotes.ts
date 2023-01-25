import { IVote } from './Vote';

export interface IPollVotes {
  pollVotes: IVote[];
  userVote: IVote | undefined;
}
