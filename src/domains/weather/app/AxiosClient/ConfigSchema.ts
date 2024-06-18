import z from "zod";
import { Validator } from "../Validator";

export type configDataType = { baseUrl?: string; apiKey?: string };

export const getWeatherApiConfig = (config: configDataType) => {
  return Validator.run(
    z.object({ baseUrl: z.string().url(), apiKey: z.string() }),
    {
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
    }
  );
};

export const weatherApiConfig = getWeatherApiConfig({
  apiKey: process.env.API_KEY,
  baseUrl: process.env.EXTERNAL_API,
});
