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
      const pollId = this.guid.generate();

      req.connectedPolls[pollId] = {
        createdOn: new Date(),
        connectedUsers: [],
      };

      const response = { ...req.connectedPolls[pollId], id: pollId };

      res.status(200).send(response);
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
      res.status(200).send(response);
    });

    this.router.delete(
      '/delete/:pollId',
      (req: Request | any, res: Response) => {
        const connectedPolls = req.connectedPolls;
        const pollId = req.params.pollId;

        delete connectedPolls[pollId];

        res.status(200).end();
      }
    );
  }
}

export default new PollController();