import Http from "./Http";

class Response {
  private timeStamp: string;

  constructor(public statusCode: number, private httpStatus: string, private message: string, private data: Record<string, unknown>) {
    this.timeStamp = new Date().toLocaleString();
  }
}

export function BAD_REQUEST(message: string, data = {}) {
  return new Response( Http.BAD_REQUEST.code, Http.BAD_REQUEST.status, message, data );
}

export function CREATED(message: string, data = {}) {
  return new Response( Http.CREATED.code, Http.CREATED.status, message, data );
}

export function FORBIDDEN(message: string, data = {}) {
  return new Response( Http.FORBIDDEN.code, Http.FORBIDDEN.status, message, data );
}

export function INTERNAL_SERVER_ERROR(message: string, data = {}) {
  return new Response( Http.INTERNAL_SERVER_ERROR.code, Http.INTERNAL_SERVER_ERROR.status, message, data );
}

export function OK(message: string, data = {}) {
  return new Response(Http.OK.code, Http.OK.status, message, data);
}

export default Response;

// console.log(OK("Request successful", { userId: 1 }));
