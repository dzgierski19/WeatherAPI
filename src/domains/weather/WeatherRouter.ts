import { Router } from "express";
import { weatherController } from "./../../IoC";

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
  "/weather/historical/:city/:date",
  weatherController.getHistoricalWeatherForCity
);

weatherRouter.get(
  "/weather/prediction/:city/:date",
  weatherController.getWeatherPredictionForCity
);
