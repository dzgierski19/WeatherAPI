import { NextFunction, Request, Response } from "express";
import { DomainError } from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DomainError) {
    res.status(ResponseStatus.BAD_REQUEST).json({
      status: ResponseStatus.BAD_REQUEST,
      message: error.message,
      error: error,
      type: "DomainError",
    });
    return;
  }
};