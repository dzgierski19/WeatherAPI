import { Router } from "express";
import { weatherController } from "./../../IoC";

require("express-async-errors");

export const weatherRouter = Router();

weatherRouter.get(
  "/weather/cities/:city",
  weatherController.getCurrentWeatherForCity
);

weatherRouter.get(
  "/weather/locations/:lat/:lon",
  weatherController.getCurrentWeatherForLocation
);

weatherRouter.get(
  "/weather/historical/:date/:city/",
  weatherController.getHistoricalWeatherForCity
);

weatherRouter.get(
  "/weather/prediction/cities/:city",
  weatherController.getWeatherPredictionForCityInDateRange
);

weatherRouter.get(
  "/weather/prediction/location/:lat/:lon",
  weatherController.getWeatherPredictionForLocationInDateRange
);

weatherRouter.get(
  "/weather/prediction/:date/:city",
  weatherController.getWeatherPredictionForCity
);
