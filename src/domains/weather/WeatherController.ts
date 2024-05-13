import { Request, Response } from "express";
import { IWeatherService } from "./WeatherService";

export interface IWeatherController {
  getCurrentWeatherForCity(req: Request, res: Response): Promise<void>;
  getCurrentWeatherForLocation(req: Request, res: Response): Promise<void>;
  getHistoricalWeatherForCity(req: Request, res: Response): Promise<void>;
  getWeatherPredictionForCity(req: Request, res: Response): Promise<void>;
  getWeatherPredictionForCityInDateRange(
    req: Request,
    res: Response
  ): Promise<void>;
  getWeatherPredictionForLocationInDateRange(
    req: Request,
    res: Response
  ): Promise<void>;
}

export class WeatherController implements IWeatherController {
  constructor(private readonly weatherService: IWeatherService) {}

  getCurrentWeatherForCity = async (req: Request, res: Response) => {
    const city = req.params.city;
    console.log(this);
    const weather = await this.weatherService.getCurrentWeatherForCity(city);
    res.status(200).json(weather);
  };

  getCurrentWeatherForLocation = async (req: Request, res: Response) => {
    const lat = +req.params.lat;
    const lon = +req.params.lon;
    const weather = await this.weatherService.getCurrentWeatherForLocation(
      lat,
      lon
    );
    res.status(200).json(weather);
  };

  getHistoricalWeatherForCity = async (req: Request, res: Response) => {
    const date = new Date(req.params.date);
    const city = req.params.city;
    const weather = await this.weatherService.getAverageDailyWeatherForPastDate(
      date,
      city
    );
    res.status(200).json(weather);
  };

  getWeatherPredictionForCity = async (req: Request, res: Response) => {
    const date = new Date(req.params.date);
    const city = req.params.city;
    const weather =
      await this.weatherService.getAverageDailyWeatherForFutureDate(date, city);
    res.status(200).json(weather);
  };

  getWeatherPredictionForCityInDateRange = async (
    req: Request,
    res: Response
  ) => {
    const dateFrom = new Date(req.query.dateFrom as string);
    const dateTo = new Date(req.query.dateTo as string);
    const city = req.params.city;
    const response =
      await this.weatherService.getAverageDailyWeatherForSpecificDateRange(
        dateFrom,
        dateTo,
        city
      );
    res.status(200).json(response);
  };

  getWeatherPredictionForLocationInDateRange = async (
    req: Request,
    res: Response
  ) => {
    const dateFrom = new Date(req.query.dateFrom as string);
    const dateTo = new Date(req.query.dateTo as string);
    const lat = +req.params.lat;
    const lon = +req.params.lon;
    const response =
      await this.weatherService.getAverageDailyWeatherForSpecificDateRangFromLatLon(
        dateFrom,
        dateTo,
        lat,
        lon
      );
    res.status(200).json(response);
  };
}

// env.example
// postman
// polly-js
