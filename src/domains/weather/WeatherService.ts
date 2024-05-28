import * as dotenv from "dotenv";
dotenv.config();
import axios, { AxiosError } from "axios";
import { DomainError } from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";
import { IWeatherHttpClient } from "../HttpClient/WeatherHttpClient";

export interface IWeatherService {
  getCurrentWeatherForLocation(lat: number, lon: number): Promise<number>;
  getCurrentWeatherForCity(city: string): Promise<number>;
  getAverageHistoricalDailyWeatherInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string
  ): Promise<[string, number][]>;
  getAverageHistoricalDailyWeatherInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number
  ): Promise<[string, number][]>;
  getAverageDailyWeatherPredictionInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string
  ): Promise<[string, number][]>;
  getAverageDailyWeatherPredictionInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number
  ): Promise<[string, number][]>;
}

export class WeatherService implements IWeatherService {
  constructor(private readonly weatherHttpClient: IWeatherHttpClient) {}

  async getCurrentWeatherForCity(city: string) {
    const actualDate = new Date().toISOString();
    try {
      const response = await this.weatherHttpClient.getCurrentData(
        `/${city}/${actualDate}`
      );
      return response.data.currentConditions.temp;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getCurrentWeatherForLocation(lat: number, lon: number) {
    const actualDate = new Date().toISOString();
    try {
      const response = await this.weatherHttpClient.getCurrentData(
        `/${lat}%2C%20
          ${lon}/${actualDate}`
      );
      return response.data.currentConditions.temp;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getAverageDailyWeatherPredictionInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromFuture(dateFrom);
    this.isDateFromFuture(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    try {
      const response = await this.weatherHttpClient.getPastOrFutureData(
        `/${city}/${getDateFromAsString}/${getDateToAsString}`
      );
      const res: [string, number][] = response.data.days.map((element: any) => {
        return [element.datetime, element.temp];
      });
      return res;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getAverageDailyWeatherPredictionInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromFuture(dateFrom);
    this.isDateFromFuture(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    try {
      const response = await this.weatherHttpClient.getPastOrFutureData(
        `/${lat}%2C%20${lon}/${getDateFromAsString}/${getDateToAsString}`
      );
      console.log(response.data);
      return response.data.days.map((element: any) => {
        return [element.datetime, element.temp];
      });
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getAverageHistoricalDailyWeatherInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromPast(dateFrom);
    this.isDateFromPast(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    try {
      const response = await this.weatherHttpClient.getPastOrFutureData(
        `/${city}/${getDateFromAsString}/${getDateToAsString}`
      );
      const res: [string, number][] = response.data.days.map((element: any) => {
        return [element.datetime, element.temp];
      });
      return res;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }
  async getAverageHistoricalDailyWeatherInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromPast(dateFrom);
    this.isDateFromPast(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    try {
      const response = await this.weatherHttpClient.getPastOrFutureData(
        `/${lat}%2C%20${lon}/${getDateFromAsString}/${getDateToAsString}`
      );
      console.log(response.data);
      return response.data.days.map((element: any) => {
        return [element.datetime, element.temp];
      });
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  // private async getAverageDailyWeatherForLocationInPastOrFutureDate(
  //   date: Date,
  //   lat: number,
  //   lon: number
  // ) {
  //   const getDate = this.convertDate(date);
  //   try {
  //     const response = await this.weatherHttpClient.getPastOrFutureData(
  //       `/${lat}%2C%20${lon}/${getDate}`
  //     );
  //     return response.data.days[0].temp;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // private async getAverageDailyWeatherForCityInPastOrFutureDate(
  //   date: Date,
  //   city: string
  // ) {
  //   const getDate = this.convertDate(date);
  //   try {
  //     const response = await this.weatherHttpClient.getPastOrFutureData(
  //       `/${city}/${getDate}`
  //     );
  //     return response.data.days[0].temp;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  private convertDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private isDateFromPast(date: Date) {
    const checkedDateInMillisecondsFrom1970 = date.getTime();
    const currentDateInMillisecondsFrom1970 = Date.now();
    const actualDate = new Date();
    if (
      this.convertDate(date) === this.convertDate(actualDate) ||
      checkedDateInMillisecondsFrom1970 >= currentDateInMillisecondsFrom1970
    ) {
      throw new DomainError(
        `Please type date from past, ${date} is wrong`,
        ResponseStatus.BAD_REQUEST
      );
    }
  }

  private isDateFromFuture(date: Date) {
    const checkedDateInMillisecondsFrom1970 = date.getTime();
    const currentDateInMillisecondsFrom1970 = Date.now();
    const actualDate = new Date();
    if (
      this.convertDate(date) === this.convertDate(actualDate) ||
      checkedDateInMillisecondsFrom1970 <= currentDateInMillisecondsFrom1970
    ) {
      throw new DomainError(
        `Please type date from future, ${date} is wrong`,
        ResponseStatus.BAD_REQUEST
      );
    }
  }

  private isDate1EarlierThanDate2(date1: Date, date2: Date) {
    const checkedDate1InMillisecondsFrom1970 = date1.getTime();
    const checkedDate2InMillisecondsFrom1970 = date2.getTime();
    if (
      checkedDate1InMillisecondsFrom1970 > checkedDate2InMillisecondsFrom1970
    ) {
      throw new DomainError(
        `${date1} must be earlier than ${date2}`,
        ResponseStatus.BAD_REQUEST
      );
    }
  }
}
