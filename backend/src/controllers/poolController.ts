import { GuidService } from './../utils/guidService';
import { Request, Response, Router } from 'express';

class PoolController {
  public router: Router;
  private guid: GuidService;

  constructor() {
    this.guid = new GuidService();

    this.router = Router();

    this.configureRouter();
  }

  private configureRouter(): void {
    this.router.get('/create', (req: Request | any, res: Response) => {
      const poolId = this.guid.generate();

      req.connectedPools[poolId] = [];

      const response = {
        id: poolId,
        connectedUsers: req.connectedPools[poolId],
      };

      res.status(200).send(response);
    });

    this.router.get('/', (req: Request | any, res: Response) => {
      const connectedPools = req.connectedPools;
      const response = Object.keys(connectedPools).map((poolId) => {
        const usersQuantity = connectedPools[poolId].length;

        return {
          id: poolId,
          connectedUsers: connectedPools[poolId],
          usersQuantity,
        };
      });
      res.status(200).send(response);
    });

    this.router.delete(
      '/delete/:poolId',
      (req: Request | any, res: Response) => {
        const connectedPools = req.connectedPools;
        const poolId = req.params.poolId;

        delete connectedPools[poolId];

        res.status(200).end();
      }
    );
  }
}

export default new PoolController();
