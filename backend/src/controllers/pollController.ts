import { Request, Response, Router } from 'express';

import { GuidService } from '../utils/guidService';

class PollController {
  public router: Router;
  private guid: GuidService;

  private DAY: number = 86400000;

  constructor() {
    this.guid = new GuidService();

    this.router = Router();

    this.configureRouter();
  }

  private configureRouter(): void {
    this.router.post('/create', (req: Request | any, res: Response) => {
      const userId = req.body.userId;

      const pollId = this.guid.generate();

      req.connectedPolls[pollId] = {
        createdOn: new Date(),
        connectedUsers: { [userId]: '' },
      };

      const response = { ...req.connectedPolls[pollId], id: pollId };

      return res.status(200).send(response);
    });

    this.router.post('/enter', (req: Request | any, res: Response) => {
      const pollId = req.body.pollId;

      const poll = req.connectedPolls[pollId];

      let response: any;

      if (poll) {
        response = { ...poll, id: pollId };

        return res.status(200).send(response);
      } else {
        response = {
          error: 'Poll id not found',
          code: 404,
        };

        return res.status(404).send(response);
      }
    });

    this.router.get('/', (req: Request | any, res: Response) => {
      const connectedPolls = req.connectedPolls;
      const response = Object.keys(connectedPolls)
        .map((pollId) => {
          const poll = { ...connectedPolls[pollId], id: pollId };

          return poll;
        })
        .filter((poll) => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          const isAvailable = poll.createdOn - (date as any) <= this.DAY * 2;

          if (!isAvailable) {
            delete connectedPolls[poll.id];
          }

          return isAvailable;
        });

      return res.status(200).send(response);
    });

    this.router.delete(
      '/delete/:pollId',
      (req: Request | any, res: Response) => {
        const userId = req.body.userId;

        const connectedPolls = req.connectedPolls;
        const pollId = req.params.pollId;

        let response;

        if (!pollId || pollId == '') {
          response = {
            error: 'Poll id not sent',
            code: 400,
          };

          return res.status(400).send(response);
        }

        const poll = connectedPolls[pollId];

        if (!poll) {
          response = {
            error: 'Poll not found',
            code: 404,
          };
          return res.status(404).send(response);
        }

        const connectedUsers = poll.connectedUsers;

        delete connectedUsers[userId];

        if (Object.keys(connectedUsers).length <= 0) {
          delete connectedPolls[pollId];

          return res.status(204).end();
        }

        return res.status(200).end();
      }
    );
  }
}

export default new PollController();
