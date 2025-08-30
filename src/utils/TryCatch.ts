import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "./Response";
import CustomError from "./Error";
import { Request, Response } from "express";

// Fix: Return a proper middleware function
const tryCatch = (controller: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      await controller(req, res);
    } catch (error: CustomError | unknown) {
      if (error instanceof CustomError) {
        const { status, status_code, message, data } = error;
        switch (status) {
          case "BAD_REQUEST":
            res.status(400).json(BAD_REQUEST(message, data));
            break;
          case "INTERNAL_SERVER_ERROR":
            res.status(status_code).json(INTERNAL_SERVER_ERROR(error.message));
            break;
          default:
            res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
            break;
        }
      } else {
        console.error("Error occurred:", error);
        res.status(500).json(INTERNAL_SERVER_ERROR("An unexpected error occurred"));
      }
    }
  };

export default tryCatch;