import { ZodError, ZodSchema } from 'zod';
import { BAD_REQUEST } from '../utils/Response';
import { NextFunction, Request, Response } from 'express';

const schemas = ['body', 'params', 'query'];

export default function zValidator(type: string, schema: ZodSchema) {
  if (!schemas.includes(type)) {
    throw new Error(
      `Invalid schema type. Must be one of: ${schemas.join(', ')}`
    );
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataToValidate: Record<string, unknown>;
      switch (type) {
        case 'body':
          dataToValidate = req.body;
          break;
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        default:
          return res.status(400).send(BAD_REQUEST('Invalid schema type'));
      }

      // Validate the data
      console.log(dataToValidate);
      const validatedData = await schema.parseAsync(dataToValidate);
      console.log(validatedData);

      // Attach validated data back to request
      req[type] = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        return res
          .status(400)
          .send(BAD_REQUEST('Validation failed', errorMessages));
      }

      console.error('Unexpected validation error:', error);
      return res.status(500).send(BAD_REQUEST('Internal validation error'));
    }
  };
}

export function validateBody(schema: ZodSchema) {
  return zValidator('body', schema);
}

export function validateParams(schema: ZodSchema) {
  return zValidator('params', schema);
}

export function validateQuery(schema: ZodSchema) {
  return zValidator('query', schema);
}
