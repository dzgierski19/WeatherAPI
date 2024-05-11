import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { weatherRouter } from "./domains/weather/WeatherRouter";

const PORT = 9000;

const app = express();

app.get("/", (req, res) => {
  console.log("it's working");
  res.send("response from server");
});

app.use(weatherRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});