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
nodeRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Details of node ${id}` });
});

/** Update specific node */
nodeRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Node ${id} updated` });
});

/** Delete specific node */
nodeRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Node ${id} deleted` });
});

export default nodeRouter;