import { WeatherController } from "./domains/weather/WeatherController";
import { WeatherService } from "./domains/weather/WeatherService";

export const weatherService = new WeatherService();
export const weatherController = new WeatherController(weatherService);
