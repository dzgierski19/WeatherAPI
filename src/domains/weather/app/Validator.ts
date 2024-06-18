import { ZodSchema } from "zod";

export class Validator {
  static run<T>(schema: ZodSchema<T>, data: Record<string, unknown>): T {
    return schema.parse(data);
  }
}
