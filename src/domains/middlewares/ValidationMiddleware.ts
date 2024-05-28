import { SafeParseReturnType, Schema, ZodError } from "zod";
import { ExpressAnyRequestData } from "../interfaces/ApiTypes";
import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";

export function validateExpressRequest<T extends ExpressAnyRequestData>(
  schema: Schema<T>,
  req: Request
): T {
  const { params, query, body } = req;

  const dataToParse: {
    params?: Record<string, string>;
    query?: ParsedQs;
    body?: unknown;
  } = {};

  if (Object.keys(params).length) {
    dataToParse.params = params;
  }

  if (query && Object.keys(query).length) {
    dataToParse.query = query;
  }

  if (body && Object.keys(body).length) {
    dataToParse.body = body;
  }

  const validationResult: SafeParseReturnType<
    {
      params?: Record<string, string>;
      query?: ParsedQs;
      body?: unknown;
    },
    { params?: any; query?: any; body?: any }
  > = schema.safeParse(dataToParse);

  if (!validationResult.success) {
    throw new ZodError(validationResult.error.issues);
  }
  return {
    query: validationResult.data.query,
    params: validationResult.data.params,
    body: validationResult.data.body,
  } as T;
}

export function validatorMiddleware(
  schema: Schema
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = validateExpressRequest(schema, req);

      const { params, query, body } = result;
      req.query = query;
      req.params = params;
      req.body = body;

      return next();
    } catch (e) {
      return next(e);
    }
  };
}
