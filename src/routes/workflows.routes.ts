import { Request, Response, Router } from "express";
import tryCatch from "../utils/TryCatch";
import WorkFlowController from "../controllers/workflow.controller";
import { validateBody, validateParams } from "../validator";
import { createWorkFlowSchema, IDSchema } from "../validator/schemas";
import { ObjectId } from "mongoose";

const workflowRouter = Router()
const workflowController = new WorkFlowController();

/** Create a new workflow */
workflowRouter.post('/', validateBody(createWorkFlowSchema), tryCatch( async (req: Request, res: Response) => {
  const r = await workflowController.createWorkFlow(req.body);
  res.status(r.statusCode).json(r);
}));

/** Start a new workflow */
workflowRouter.post('/start/:id', validateParams(IDSchema), tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Workflow ${id} started` });
}));

/** Stop a specific workflow */
workflowRouter.post('/stop/:id', validateParams(IDSchema), tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Workflow ${id} stopped` });
}));

/** Get status of a specific workflow */
workflowRouter.get('/status/:id', validateParams(IDSchema), tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Status of workflow ${id}` });
}));

/** Restart a specific workflow */
workflowRouter.post('/restart/:id', validateParams(IDSchema), tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Workflow ${id} restarted` });
}));

/** Get a specific workflow */
workflowRouter.get('/:id', validateParams(IDSchema), tryCatch( async (req: Request, res: Response) => {
  const { id } = req.params;
  const r = await workflowController.fetchWorkFlow(id as unknown as ObjectId);
  res.status(r.statusCode).json(r);
}));

export default workflowRouter;