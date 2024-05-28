import * as dotenv from "dotenv";
dotenv.config();
import { AxiosError, AxiosResponse } from "axios";
import { unitGroup } from "./HttpClientTypes";
import { AxiosClient } from "../AxiosClient/AxiosClient";

export interface IWeatherHttpClient {
  getCurrentData(url: string): Promise<AxiosResponse>;
  getPastOrFutureData(url: string): Promise<AxiosResponse>;
}

export class WeatherHttpClient implements IWeatherHttpClient {
  constructor(private readonly axiosClient: AxiosClient) {}

  async getCurrentData(url: string) {
    const createdAxios = this.createAxiosInstance();
    try {
      const response = await createdAxios.get(url, {
        params: { include: "current" },
      });
      return response;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getPastOrFutureData(url: string) {
    const axiosClient = this.createAxiosInstance();
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  private createAxiosInstance() {
    return this.axiosClient.createAxiosInstance();
  }
}
