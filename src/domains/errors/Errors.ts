import { ResponseStatus } from "./ErrorTypes";

export class DomainError extends Error {
  statusCode: number;
  status: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
  }
}

export class ItemNotAvailableError extends DomainError {
  constructor(
    message: string,
    statusCode: number = ResponseStatus.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}
