import { Router } from "express";

const workflowRouter = Router()

workflowRouter.post('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Workflows API' });
});

export default workflowRouter;