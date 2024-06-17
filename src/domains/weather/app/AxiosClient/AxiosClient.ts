import * as dotenv from "dotenv";
dotenv.config();
import axios, { AxiosInstance } from "axios";
import { weatherApiConfig } from "./ConfigSchema";
import { configDataType } from "./ConfigTypes";

export class WeatherApiClient {
  api: AxiosInstance;

  constructor(private readonly config: configDataType) {
    this.api = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    weatherApiConfig(this.config);
    return axios.create({
      baseURL: this.config.baseUrl,
      params: {
        key: this.config.apiKey,
      },
    });
  }
}
