import { WeatherController } from "./domains/weather/WeatherController";
import { WeatherService } from "./domains/weather/WeatherService";
import { WeatherHttpAdapter } from "./domains/weather/adapters/HttpClient/WeatherHttpAdapter";
import { WeatherApiClient } from "./domains/weather/app/AxiosClient/AxiosClient";

export const axiosClient = new WeatherApiClient();
export const weatherHttpAdapter = new WeatherHttpAdapter(axiosClient);
export const weatherService = new WeatherService(weatherHttpAdapter);
export const weatherController = new WeatherController(weatherService);
