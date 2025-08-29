import { Request, Response, Router } from "express";
import tryCatch from "../utils/TryCatch";

const nodeRouter = Router()

/** Create a new workflow node */
nodeRouter.post('/', tryCatch( async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Nodes API' });
}));

/** List all nodes */
nodeRouter.get('/', tryCatch( async (req: Request, res: Response) => {
  res.status(200).json({ message: 'List of all nodes' });
}));

/** Get specific node */
nodeRouter.get('/:id', tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Details of node ${id}` });
}));

/** Update specific node */
nodeRouter.put('/:id', tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Node ${id} updated` });
}));

/** Delete specific node */
nodeRouter.delete('/:id', tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Node ${id} deleted` });
}));

export default nodeRouter;