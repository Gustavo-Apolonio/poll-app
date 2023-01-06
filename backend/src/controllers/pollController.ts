import { Response, Router } from 'express';

import { IPoll, IRequest, IUser } from '../models';
import { ErrorStatus, SuccessStatus } from '../enums';

import { ErrorService, GuidService } from '../utils';

class PollController {
  public router: Router;
  private DAY: number = 86400000;

  constructor() {
    this.router = Router();

    this.configureRouter();
  }

  private configureRouter(): void {
    this.router.post(
      '/create',
      (req: IRequest, res: Response): Response => {
        const userId: string = req.body.userId;

        const pollId: string = GuidService.generate();

        const poll: IPoll = {
          createdOn: new Date(),
          id: pollId,
          connectedUsers: [{ id: userId, connectionId: '' }],
        };

        req.connectedPolls?.push(poll);

        return res.status(SuccessStatus.OK).send(poll);
      }
    );

    this.router.post(
      '/enter',
      (req: IRequest, res: Response): Response => {
        const pollId: string = req.body.pollId;

        const poll: IPoll | undefined = req.connectedPolls?.find(
          (poll: IPoll) => poll.id == pollId
        );

        if (!poll)
          return res
            .status(ErrorStatus.NotFound)
            .send(ErrorService.NotFound('Poll not found.'));

        return res.status(SuccessStatus.OK).send(poll);
      }
    );

    this.router.get(
      '/',
      (req: IRequest, res: Response): Response => {
        const connectedPolls: IPoll[] = req.connectedPolls || [];

        const response: IPoll[] = connectedPolls.filter(
          (poll: IPoll, index: number) => {
            const currentDate: Date = new Date();
            currentDate.setDate(currentDate.getDate() - 1);
            const isAvailable: boolean =
              poll.createdOn.getDate() - currentDate.getDate() <= this.DAY * 2;

            if (!isAvailable) connectedPolls.splice(index, 1);

            return isAvailable;
          }
        );

        return res.status(SuccessStatus.OK).send(response);
      }
    );

    this.router.delete(
      '/delete/:pollId',
      (req: IRequest, res: Response): Response => {
        const userId: string = req.body.userId;

        const connectedPolls: IPoll[] = req.connectedPolls || [];
        const pollId: string = req.params.pollId;

        if (connectedPolls.length == 0)
          return res
            .status(ErrorStatus.NotFound)
            .send(ErrorService.NotFound('There is no polls to delete'));

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
            connectedUsers.splice(
              poll.connectedUsers.indexOf(connectedUser),
              1
            );

            if (connectedUsers.length == 0) {
              connectedPolls.splice(connectedPolls.indexOf(poll), 1);

              return res.status(SuccessStatus.OkNoContent).end();
            }

            return res.status(SuccessStatus.OkNoContent).end();
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
  }
}

export default new PollController();
