import { WeatherController } from "./domains/weather/WeatherController";
import { WeatherService } from "./domains/weather/WeatherService";
import { AxiosClient } from "./domains/AxiosClient/AxiosClient";
import { WeatherHttpClient } from "./domains/HttpClient/WeatherHttpClient";

export const axiosClient = new AxiosClient();
export const weatherHttpClient = new WeatherHttpClient(axiosClient);
export const weatherService = new WeatherService(weatherHttpClient);
export const weatherController = new WeatherController(weatherService);
