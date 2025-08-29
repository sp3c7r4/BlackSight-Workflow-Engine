import { Router } from "express";

const instanceRouter = Router()

instanceRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Instances API' });
});

export default instanceRouter;