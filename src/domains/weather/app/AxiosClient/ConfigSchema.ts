import z, { ZodSchema } from "zod";
import { configDataType } from "./ConfigTypes";

export class Validator {
  static run<T>(schema: ZodSchema<T>, data: Record<string, unknown>): T {
    return schema.parse(data);
  }
}

export const weatherApiConfig = (config: configDataType) => {
  Validator.run(z.object({ baseUrl: z.string().url(), apiKey: z.string() }), {
    baseUrl: config.baseUrl,
    apiKey: config.apiKey,
  });
};
