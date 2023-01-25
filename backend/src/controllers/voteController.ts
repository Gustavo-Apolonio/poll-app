import { Response, Router } from 'express';

import { IPoll, IRequest, IUser, IVote } from '../models';
import { ErrorStatus, SuccessStatus } from '../enums';

import { ErrorService } from '../utils';

class VoteController {
  public router: Router;

  constructor() {
    this.router = Router();

    this.configureRouter();
  }

  private configureRouter(): void {
    this.router.put(
      '/',
      (req: IRequest, res: Response): Response => {
        const userId: string = req.body.userId;
        const pollId: string = req.body.pollId;
        const vote: IVote = req.body.vote;
        const connectedPolls: IPoll[] = req.connectedPolls || [];

        if (connectedPolls.length == 0)
          return res
            .status(ErrorStatus.NotFound)
            .send(ErrorService.NotFound('There is no polls anymore'));

        if (!pollId || pollId == '')
          return res
            .status(ErrorStatus.BadRequest)
            .send(ErrorService.BadRequest('Poll id not sent'));

        const poll: IPoll | undefined = connectedPolls.find(
          (poll: IPoll) => poll.id == pollId
        );

        if (poll) {
          const connectedUsers: IUser[] = poll.connectedUsers;
          const connectedUser: IUser | undefined = poll.connectedUsers.find(
            (_connectedUser: IUser) => _connectedUser.id == userId
          );

          if (connectedUser) {
            if (!vote || !vote.title || vote.title == '')
              return res
                .status(ErrorStatus.BadRequest)
                .send(ErrorService.BadRequest('Vote not sent'));

            connectedUser.vote = vote;
            const votedOption = poll.votes.find(
              (pollVote: IVote) => pollVote.title == vote.title
            );

            if (votedOption) {
              if (votedOption.quantity) votedOption.quantity += 1;
              else votedOption.quantity = 1;
            }

            connectedUsers
              .filter(
                (pollConnectedUser: IUser) =>
                  pollConnectedUser.id != connectedUser.id
              )
              .forEach((pollConnectedUser: IUser) =>
                req.io
                  ?.to(pollConnectedUser.connectionId)
                  .emit('vote-submitted', poll.votes)
              );

            return res.status(SuccessStatus.OK).send(poll);
          } else
            return res
              .status(ErrorStatus.NotFound)
              .send(ErrorService.NotFound('User not found on connected users'));
        } else
          return res
            .status(ErrorStatus.NotFound)
            .send(ErrorService.NotFound('Poll not found'));
      }
    );

    // this.router.delete(
    //   '/undo',
    //   (req: IRequest, res: Response): Response => {
    //     const userId: string = req.body.userId;

    //     const connectedPolls: IPoll[] = req.connectedPolls || [];
    //     const pollId: string = req.params.pollId;

    //     if (connectedPolls.length == 0)
    //       return res
    //         .status(ErrorStatus.NotFound)
    //         .send(ErrorService.NotFound('There is no polls to delete'));

    //     if (!pollId || pollId == '')
    //       return res
    //         .status(ErrorStatus.BadRequest)
    //         .send(ErrorService.BadRequest('Poll id not sent'));

    //     const poll: IPoll | undefined = connectedPolls.find(
    //       (poll: IPoll) => poll.id == pollId
    //     );

    //     if (poll) {
    //       const connectedUsers: IUser[] = poll.connectedUsers;
    //       const connectedUser: IUser | undefined = poll.connectedUsers.find(
    //         (_connectedUser: IUser) => _connectedUser.id == userId
    //       );

    //       if (connectedUser) {
    //         connectedUsers.splice(
    //           poll.connectedUsers.indexOf(connectedUser),
    //           1
    //         );

    //         if (connectedUsers.length == 0) {
    //           connectedPolls.splice(connectedPolls.indexOf(poll), 1);

    //           return res.status(SuccessStatus.OkNoContent).end();
    //         }

    //         return res.status(SuccessStatus.OkNoContent).end();
    //       } else
    //         return res
    //           .status(ErrorStatus.NotFound)
    //           .send(ErrorService.NotFound('User not found on connected users'));
    //     } else
    //       return res
    //         .status(ErrorStatus.NotFound)
    //         .send(ErrorService.NotFound('Poll not found'));
    //   }
    // );
  }
}

export default new VoteController();
