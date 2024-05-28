import { Router } from "express";
import { weatherController } from "./../../IoC";
import { validatorMiddleware } from "../middlewares/ValidationMiddleware";
import {
  getCurrentWeatherForCitySchema,
  getCurrentWeatherForLocationSchema,
  getWeatherForCityInDateRangeSchema,
  getWeatherForLocationInDateRangeSchema,
} from "../../schemas/ValidateSchemas";

require("express-async-errors");

export const weatherRouter = Router();

// CURRENT WEATHER

weatherRouter.get(
  "/weather/cities/:city",
  validatorMiddleware(getCurrentWeatherForCitySchema),
  weatherController.getCurrentWeatherForCity
);

weatherRouter.get(
  "/weather/locations/:lat/:lon",
  validatorMiddleware(getCurrentWeatherForLocationSchema),
  weatherController.getCurrentWeatherForLocation
);

// HISTORICAL WEATHER

weatherRouter.get(
  "/weather/historical/cities/:city",
  validatorMiddleware(getWeatherForCityInDateRangeSchema),
  weatherController.getHistoricalWeatherForCityInDateRange
);

weatherRouter.get(
  "/weather/historical/locations/:lat/:lon",
  validatorMiddleware(getWeatherForLocationInDateRangeSchema),
  weatherController.getHistoricalWeatherForLocationInDateRange
);

// PREDICTED WEATHER

weatherRouter.get(
  "/weather/prediction/cities/:city",
  validatorMiddleware(getWeatherForCityInDateRangeSchema),
  weatherController.getWeatherPredictionForCityInDateRange
);

weatherRouter.get(
  "/weather/prediction/locations/:lat/:lon",
  validatorMiddleware(getWeatherForLocationInDateRangeSchema),
  weatherController.getWeatherPredictionForLocationInDateRange
);
