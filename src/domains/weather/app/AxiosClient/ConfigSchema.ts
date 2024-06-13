import z, { ZodSchema } from "zod";

export class Validator {
  static run<T>(schema: ZodSchema<T>, data: Record<string, unknown>): T {
    return schema.parse(data);
  }
}

export const weatherApiConfig = Validator.run(
  z.object({ baseUrl: z.string().url(), apiKey: z.string() }),
  { baseUrl: process.env.EXTERNAL_API, apiKey: process.env.API_KEY }
);
