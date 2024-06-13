import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { DomainError } from "../../domains/errors/Errors";
import { ErrorStatus } from "../../domains/errors/ErrorStatus";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DomainError) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error,
      type: "DomainError",
    });
    return;
  }
  if (error instanceof AxiosError) {
    res.status(ErrorStatus.BAD_REQUEST).json({
      status: ErrorStatus.BAD_REQUEST,
      message: error.message,
      error: error,
      type: "AxiosError",
    });
    return;
  }
  res.status(ErrorStatus.INTERNAL_ERROR).json({
    status: ErrorStatus.INTERNAL_ERROR,
    message: "Something went wrong!",
    error: error,
  });
};
