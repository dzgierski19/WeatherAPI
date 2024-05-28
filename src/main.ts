import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { weatherRouter } from "./domains/weather/WeatherRouter";
import { errorHandler } from "./domains/middlewares/ErrorHandler";

export const app = express();

app.get("/", (req, res) => {
  console.log("it's working");
  res.send("response from server");
});

app.use(weatherRouter);
app.use(errorHandler);
