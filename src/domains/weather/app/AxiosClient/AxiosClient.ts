import * as dotenv from "dotenv";
dotenv.config();
import axios, { AxiosInstance } from "axios";
import { configDataType, weatherApiConfig } from "./ConfigSchema";

export class WeatherApiClient {
  api: AxiosInstance;

  constructor(private readonly config: configDataType = weatherApiConfig) {
    this.api = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseUrl,
      params: {
        key: this.config.apiKey,
      },
    });
  }
}
