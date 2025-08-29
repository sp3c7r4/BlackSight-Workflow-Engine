import { Request, Response, Router } from "express";

const nodeRouter = Router()

/** Create a new workflow node */
nodeRouter.post('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Nodes API' });
});

/** List all nodes */
nodeRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'List of all nodes' });
});

/** Get specific node */
nodeRouter.get('/:id', (req: Request))


export default nodeRouter;