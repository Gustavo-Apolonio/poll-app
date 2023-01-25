import { Vote } from './Vote';

export interface PollVotes {
  pollVotes: Vote[];
  userVote: Vote | undefined;
}
