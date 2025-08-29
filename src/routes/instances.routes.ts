import { Router } from "express";

const instanceRouter = Router()

/** Get all instances */
instanceRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'List of all instances' });
});

/** Get specific instance */
instanceRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Details of instance ${id}` });
});

/** Get instance logs */
instanceRouter.get('/:id/logs', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Logs for instance ${id}` });
});

export default instanceRouter;