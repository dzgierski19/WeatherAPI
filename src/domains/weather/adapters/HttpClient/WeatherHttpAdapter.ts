import * as dotenv from "dotenv";
dotenv.config();
import { AxiosError, AxiosResponse } from "axios";
import { responseDetails, standardResponseDetails } from "./HttpClientTypes";
import { WeatherApiClient } from "../../app/AxiosClient/AxiosClient";

export interface IWeatherHttpAdapter {
  getCurrentData(url: string, params?: responseDetails): Promise<AxiosResponse>;
  getPastOrFutureData(
    url: string,
    params?: responseDetails
  ): Promise<AxiosResponse>;
}

export class WeatherHttpAdapter implements IWeatherHttpAdapter {
  constructor(private readonly httpWeatherClient: WeatherApiClient) {}

  async getCurrentData(
    url: string,
    params: responseDetails = standardResponseDetails
  ) {
    const response = await this.httpWeatherClient.api.get(url, {
      params: { ...params, include: "current" },
    });
    return response;
  }

  async getPastOrFutureData(
    url: string,
    params: responseDetails = standardResponseDetails
  ) {
    const response = await this.httpWeatherClient.api.get(url, {
      params: params,
    });
    return response;
  }
}
