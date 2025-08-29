import { Request, Response, Router } from "express";
import tryCatch from "../utils/TryCatch";
import NodeController from "../controllers/node.controller";
import { toObjectId } from "../types/Mongo";

const nodeRouter = Router()
const nodeController = new NodeController();

/** Create a new workflow node */
nodeRouter.post('/', tryCatch( async (req: Request, res: Response) => {
  const r = await nodeController.createNode(req.body);
  res.status(r.statusCode).json(r);
}));

/** List all nodes */
nodeRouter.get('/', tryCatch( async (req: Request, res: Response) => {
  const r = await nodeController.fetchNodes();
  res.status(r.statusCode).json(r);
}));

/** Get specific node */
nodeRouter.get('/:id', tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  const objectId = toObjectId(id);
  const r = await nodeController.fetchNode(objectId);
  res.status(r.statusCode).json(r);
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