import { Request, Response, Router } from "express";

const workflowRouter = Router()

/** Create a new workflow */
workflowRouter.post('/start/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Workflow ${id} started` });
});

/** Stop a specific workflow */
workflowRouter.post('/stop/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Workflow ${id} stopped` });
});

/** Get status of a specific workflow */
workflowRouter.get('/status/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Status of workflow ${id}` });
});

/** Restart a specific workflow */
workflowRouter.post('/restart/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Workflow ${id} restarted` });
});

/** Get a specific workflow */
workflowRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Details of workflow ${id}` });
});

export default workflowRouter;