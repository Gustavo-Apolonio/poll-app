import { GuidService } from './../utils/guidService';
import { Request, Response, Router } from 'express';

class PoolController {
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
      const poolId = this.guid.generate();

      req.connectedPools[poolId] = {
        createdOn: new Date(),
        connectedUsers: [],
      };

      const response = { ...req.connectedPools[poolId], id: poolId };

      res.status(200).send(response);
    });

    this.router.get('/', (req: Request | any, res: Response) => {
      const connectedPools = req.connectedPools;
      const response = Object.keys(connectedPools)
        .map((poolId) => {
          const pool = { ...connectedPools[poolId], id: poolId };

          return pool;
        })
        .filter((pool) => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          const isAvailable = pool.createdOn - (date as any) <= this.DAY * 2;

          if (!isAvailable) {
            delete connectedPools[pool.id];
          }

          return isAvailable;
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
