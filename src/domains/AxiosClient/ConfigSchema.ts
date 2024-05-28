import z from "zod";

export const configSchema = z.object({
  baseURL: z.string().url().optional(),
  apiKey: z.string().optional(),
  unitGroup: z.enum(["metric", "uk", "us", "base"]).optional(),
  contentType: z.enum(["json", "csv"]).optional(),
});
