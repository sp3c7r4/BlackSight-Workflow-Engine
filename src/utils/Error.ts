import Http from "./Http";

export default class CustomError extends Error {
  constructor(message: string, public status_code: number, public status: string, public data: unknown) {
    super(message);
    this.name = this.constructor.name;
  }
}

export function CE_BAD_REQUEST(message: string, data?: unknown) {
  throw new CustomError(
    message,
    Http.BAD_REQUEST.code,
    Http.BAD_REQUEST.status,
    data
  );
}

export function CE_INTERNAL_SERVER(message: string, data?: unknown) {
  throw new CustomError(
    message,
    Http.INTERNAL_SERVER_ERROR.code,
    Http.INTERNAL_SERVER_ERROR.status,
    data
  );
}
