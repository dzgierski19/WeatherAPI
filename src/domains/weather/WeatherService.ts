import * as dotenv from "dotenv";
dotenv.config();
import { DomainError } from "../errors/Errors";
import { ErrorStatus } from "../errors/ErrorStatus";
import { IWeatherHttpAdapter } from "./adapters/HttpClient/WeatherHttpAdapter";
import { responseDetails } from "./adapters/HttpClient/HttpClientTypes";

export interface IWeatherService {
  getCurrentWeatherForLocation(
    lat: number,
    lon: number,
    params?: responseDetails
  ): Promise<number>;
  getCurrentWeatherForCity(
    city: string,
    params?: responseDetails
  ): Promise<number>;
  getAverageHistoricalDailyWeatherInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string,
    params?: responseDetails
  ): Promise<[string, number][]>;
  getAverageHistoricalDailyWeatherInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number,
    params?: responseDetails
  ): Promise<[string, number][]>;
  getAverageDailyWeatherPredictionInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string,
    params?: responseDetails
  ): Promise<[string, number][]>;
  getAverageDailyWeatherPredictionInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number,
    params?: responseDetails
  ): Promise<[string, number][]>;
}

export class WeatherService implements IWeatherService {
  constructor(private readonly weatherHttpClient: IWeatherHttpAdapter) {}

  async getCurrentWeatherForCity(city: string, params?: responseDetails) {
    const response = await this.weatherHttpClient.getCurrentData(
      `/${city}`,
      params
    );
    return response.data.currentConditions.temp;
  }

  async getCurrentWeatherForLocation(
    lat: number,
    lon: number,
    params?: responseDetails
  ) {
    const response = await this.weatherHttpClient.getCurrentData(
      `/${lat}%2C%20${lon}`,
      params
    );
    return response.data.currentConditions.temp;
  }

  async getAverageDailyWeatherPredictionInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string,
    params?: responseDetails
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromFuture(dateFrom);
    this.isDateFromFuture(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    const response = await this.weatherHttpClient.getPastOrFutureData(
      `/${city}/${getDateFromAsString}/${getDateToAsString}`,
      params
    );
    const res: [string, number][] = response.data.days.map((element: any) => {
      return [element.datetime, element.temp];
    });
    return res;
  }

  async getAverageDailyWeatherPredictionInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number,
    params?: responseDetails
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromFuture(dateFrom);
    this.isDateFromFuture(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    const response = await this.weatherHttpClient.getPastOrFutureData(
      `/${lat}%2C%20${lon}/${getDateFromAsString}/${getDateToAsString}`,
      params
    );
    console.log(response.data);
    return response.data.days.map((element: any) => {
      return [element.datetime, element.temp];
    });
  }

  async getAverageHistoricalDailyWeatherInSpecificDateRangeForCity(
    dateFrom: Date,
    dateTo: Date,
    city: string,
    params?: responseDetails
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromPast(dateFrom);
    this.isDateFromPast(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    const response = await this.weatherHttpClient.getPastOrFutureData(
      `/${city}/${getDateFromAsString}/${getDateToAsString}`,
      params
    );

    const res: [string, number][] = response.data.days.map((element: any) => {
      return [element.datetime, element.temp];
    });
    return res;
  }
  async getAverageHistoricalDailyWeatherInSpecificDateRangeForLocation(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number,
    params?: responseDetails
  ) {
    this.isDate1EarlierThanDate2(dateFrom, dateTo);
    this.isDateFromPast(dateFrom);
    this.isDateFromPast(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    const response = await this.weatherHttpClient.getPastOrFutureData(
      `/${lat}%2C%20${lon}/${getDateFromAsString}/${getDateToAsString}`,
      params
    );
    console.log(response.data);
    return response.data.days.map((element: any) => {
      return [element.datetime, element.temp];
    });
  }

  private convertDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private isDateFromPast(date: Date) {
    const checkedDateTimestamp = date.getTime();
    const currentDateTimestamp = Date.now();
    const actualDate = new Date();
    if (
      this.convertDate(date) === this.convertDate(actualDate) ||
      checkedDateTimestamp >= currentDateTimestamp
    ) {
      throw new DomainError(
        `Please type date from past, ${date} is wrong`,
        ErrorStatus.BAD_REQUEST
      );
    }
  }

  private isDateFromFuture(date: Date) {
    const checkedDateTimestamp = date.getTime();
    const currentDateTimestamp = Date.now();
    const actualDate = new Date();
    if (
      this.convertDate(date) === this.convertDate(actualDate) ||
      checkedDateTimestamp <= currentDateTimestamp
    ) {
      throw new DomainError(
        `Please type date from future, ${date} is wrong`,
        ErrorStatus.BAD_REQUEST
      );
    }
  }

  private isDate1EarlierThanDate2(date1: Date, date2: Date) {
    const date1Timestamp = date1.getTime();
    const date2Timestamp = date2.getTime();
    if (date1Timestamp > date2Timestamp) {
      throw new DomainError(
        `${date1} must be earlier than ${date2}`,
        ErrorStatus.BAD_REQUEST
      );
    }
  }
}
