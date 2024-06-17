import { WeatherController } from "./domains/weather/WeatherController";
import { WeatherService } from "./domains/weather/WeatherService";
import { WeatherHttpAdapter } from "./domains/weather/adapters/HttpClient/WeatherHttpAdapter";
import { WeatherApiClient } from "./domains/weather/app/AxiosClient/AxiosClient";
import { configDataType } from "./domains/weather/app/AxiosClient/ConfigTypes";

const config: configDataType = {
  baseUrl: process.env.EXTERNAL_API,
  apiKey: process.env.API_KEY,
};
export const axiosClient = new WeatherApiClient(config);
export const weatherHttpAdapter = new WeatherHttpAdapter(axiosClient);
export const weatherService = new WeatherService(weatherHttpAdapter);
export const weatherController = new WeatherController(weatherService);
