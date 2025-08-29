import { Router } from "express";
import tryCatch from "../utils/TryCatch";
import { CE_BAD_REQUEST } from "../utils/Error";

const instanceRouter = Router()

/** Get all instances */
instanceRouter.get('/', tryCatch( async (req, res) => {
  throw new CE_BAD_REQUEST("Hi")
  res.status(200).json({ message: 'List of all instances' });
}));

/** Get specific instance */
instanceRouter.get('/:id', tryCatch( async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Details of instance ${id}` });
}));

/** Get instance logs */
instanceRouter.get('/:id/logs', tryCatch( async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Logs for instance ${id}` });
}));

export default instanceRouter;