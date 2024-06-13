import { Response } from "express";
import { IWeatherService } from "./WeatherService";
import { ParsedRequest } from "../../app/interfaces/ApiTypes";
import {
  getCurrentWeatherForLocationRequest,
  getCurrentWeatherForCityRequest,
  getWeatherForCityInDateRangeRequest,
  getWeatherForLocationInDateRangeRequest,
} from "./schemas/ValidateSchemas";

export interface IWeatherController {
  getCurrentWeatherForCity(
    req: ParsedRequest<getCurrentWeatherForCityRequest>,
    res: Response
  ): Promise<void>;
  getCurrentWeatherForLocation(
    req: ParsedRequest<getCurrentWeatherForLocationRequest>,
    res: Response
  ): Promise<void>;
  getHistoricalWeatherForCityInDateRange(
    req: ParsedRequest<getWeatherForCityInDateRangeRequest>,
    res: Response
  ): Promise<void>;
  getHistoricalWeatherForLocationInDateRange(
    req: ParsedRequest<getWeatherForLocationInDateRangeRequest>,
    res: Response
  ): Promise<void>;
  getWeatherPredictionForCityInDateRange(
    req: ParsedRequest<getWeatherForCityInDateRangeRequest>,
    res: Response
  ): Promise<void>;
  getWeatherPredictionForLocationInDateRange(
    req: ParsedRequest<getWeatherForLocationInDateRangeRequest>,
    res: Response
  ): Promise<void>;
}

export class WeatherController implements IWeatherController {
  constructor(private readonly weatherService: IWeatherService) {}

  getCurrentWeatherForCity = async (
    req: ParsedRequest<getCurrentWeatherForCityRequest>,
    res: Response
  ) => {
    const city = req.params.city;
    const query = req.query;
    const weather = await this.weatherService.getCurrentWeatherForCity(
      city,
      query
    );
    res.status(200).json(weather);
  };

  getCurrentWeatherForLocation = async (
    req: ParsedRequest<getCurrentWeatherForLocationRequest>,
    res: Response
  ) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const query = req.query;
    const weather = await this.weatherService.getCurrentWeatherForLocation(
      lat,
      lon,
      query
    );
    res.status(200).json(weather);
  };

  getHistoricalWeatherForCityInDateRange = async (
    req: ParsedRequest<getWeatherForCityInDateRangeRequest>,
    res: Response
  ) => {
    const { dateFrom, dateTo, contentType, unitGroup } = req.query;
    const city = req.params.city;
    const weather =
      await this.weatherService.getAverageHistoricalDailyWeatherInSpecificDateRangeForCity(
        dateFrom,
        dateTo,
        city,
        { contentType, unitGroup }
      );
    res.status(200).json(weather);
  };

  getHistoricalWeatherForLocationInDateRange = async (
    req: ParsedRequest<getWeatherForLocationInDateRangeRequest>,
    res: Response
  ) => {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    const lat = req.params.lat;
    const lon = req.params.lon;
    const weather =
      await this.weatherService.getAverageHistoricalDailyWeatherInSpecificDateRangeForLocation(
        dateFrom,
        dateTo,
        lat,
        lon
      );
    res.status(200).json(weather);
  };

  getWeatherPredictionForCityInDateRange = async (
    req: ParsedRequest<getWeatherForCityInDateRangeRequest>,
    res: Response
  ) => {
    const { dateFrom, dateTo } = req.query;
    const city = req.params.city;
    const response =
      await this.weatherService.getAverageDailyWeatherPredictionInSpecificDateRangeForCity(
        dateFrom,
        dateTo,
        city
      );
    res.status(200).json(response);
  };

  getWeatherPredictionForLocationInDateRange = async (
    req: ParsedRequest<getWeatherForLocationInDateRangeRequest>,
    res: Response
  ) => {
    const { dateFrom, dateTo } = req.query;
    const { lat, lon } = req.params;
    const response =
      await this.weatherService.getAverageDailyWeatherPredictionInSpecificDateRangeForLocation(
        dateFrom,
        dateTo,
        lat,
        lon
      );
    res.status(200).json(response);
  };
}
