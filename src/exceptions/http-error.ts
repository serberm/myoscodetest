import HttpStatus from "http-status-codes";

export default class HttpError extends Error {
  code: number = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(m: string, code?: number, name?: string) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, Error.prototype);
    this.code = code;
    this.name = name ? name : this.constructor.name;
  }

  getCode(): number {
    return this.code;
  }
}
