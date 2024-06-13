import * as dotenv from "dotenv";
dotenv.config();
import axios, { AxiosInstance } from "axios";
import { weatherApiConfig } from "./ConfigSchema";

export class WeatherApiClient {
  api: AxiosInstance;

  constructor() {
    this.api = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: weatherApiConfig.baseUrl,
      params: {
        key: weatherApiConfig.apiKey,
      },
    });
  }
}

//config w constructorze
