import * as dotenv from "dotenv";
dotenv.config();
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_type, API_KEY } from "./WeatherTypes";

export interface IWeatherService {
  getCurrentWeatherForLocation(lat: number, lon: number): Promise<number>;
  getCurrentWeatherForCity(city: string): Promise<number>;
  getAverageDailyWeatherForPastDate(date: Date, city: string): Promise<number>;
  getAverageDailyWeatherForFutureDate(
    date: Date,
    city: string
  ): Promise<number>;
  getAverageDailyWeatherForSpecificDateRange(
    dateFrom: Date,
    dateTo: Date,
    city: string
  ): Promise<[string, number][]>;
  getAverageDailyWeatherForSpecificDateRangFromLatLon(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number
  ): Promise<[string, number][]>;
}

export class WeatherService implements IWeatherService {
  // async getCurrentWeatherForCity(city: string, country?: string) {
  //   const cityWithCountry = city + ", " + country;
  //   const apiRequest = this.createDataForApi(cityWithCountry);
  //   try {
  //     const response = await axios.get(CURRENT_WEATHER_CHECK_WEBSITE, {
  //       params: apiRequest,
  //     });
  //     return response.data.current.temperature;
  //   } catch (error) {
  //     throw new AxiosError("Axios Error");
  //   }
  // }

  async getCurrentWeatherForCity(city: string) {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=${process.env.API_KEY}&contentType=json`
      );
      return response.data.currentConditions.temp;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getCurrentWeatherForLocation(lat: number, lon: number) {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20
          ${lon}?unitGroup=metric&include=current&key=${process.env.API_KEY}&contentType=json`
      );
      return response.data.currentConditions.temp;
    } catch (err) {
      throw new AxiosError("Axios Error");
    }
  }

  async getAverageDailyWeatherForPastDate(date: Date, city: string) {
    this.isDateFromPast(date);
    return this.getAverageDailyWeatherForPastOrFutureDate(date, city);
  }

  async getAverageDailyWeatherForFutureDate(date: Date, city: string) {
    this.isDateFromFuture(date);
    return this.getAverageDailyWeatherForPastOrFutureDate(date, city);
  }

  private async getAverageDailyWeatherForPastOrFutureDate(
    date: Date,
    city: string
  ) {
    const getDate = this.convertDate(date);
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${getDate}?unitGroup=metric&key=${process.env.API_KEY}&contentType=json`
      );
      return response.data.days[0].temp;
    } catch (err) {
      throw err;
    }
  }

  async getAverageDailyWeatherForSpecificDateRange(
    dateFrom: Date,
    dateTo: Date,
    city: string
  ) {
    this.isDateFromFuture(dateFrom);
    this.isDateFromFuture(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    try {
      const response = await axios(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${getDateFromAsString}/${getDateToAsString}?unitGroup=metric&key=${process.env.API_KEY}&contentType=json`
      );
      const res: [string, number][] = response.data.days.map((element: any) => {
        return [element.datetime, element.temp];
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getAverageDailyWeatherForSpecificDateRangFromLatLon(
    dateFrom: Date,
    dateTo: Date,
    lat: number,
    lon: number
  ) {
    this.isDateFromFuture(dateFrom);
    this.isDateFromFuture(dateTo);
    const getDateFromAsString = this.convertDate(dateFrom);
    const getDateToAsString = this.convertDate(dateTo);
    try {
      const response = await axios(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20
        ${lon}/${getDateFromAsString}/${getDateToAsString}?unitGroup=metric&key=${process.env.API_KEY}&contentType=json`
      );
      console.log(response.data);
      return response.data.days.map((element: any) => {
        return [element.datetime, element.temp];
      });
    } catch (err) {
      throw err;
    }
  }

  private convertDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private isDateFromPast(date: Date) {
    const checkedDate = date.getTime();
    const currentDateInMillisecondsFrom1970 = Date.now();
    const actualDate = new Date();
    if (
      this.convertDate(date) === this.convertDate(actualDate) ||
      checkedDate >= currentDateInMillisecondsFrom1970
    ) {
      throw new Error(`Please type date from past, ${date} is wrong`);
    }
  }

  private isDateFromFuture(date: Date) {
    const checkedDate = date.getTime();
    const currentDateInMillisecondsFrom1970 = Date.now();
    const actualDate = new Date();
    if (
      this.convertDate(date) === this.convertDate(actualDate) ||
      checkedDate <= currentDateInMillisecondsFrom1970
    ) {
      throw new Error(`Please type date from future, ${date} is wrong`);
    }
  }

  private createDataForApi(
    location: string,
    hourly?: number,
    interval?: number
  ) {
    const API_req: API_type = {
      access_key: API_KEY,
      query: location,
      hourly: hourly,
      interval: interval,
    };
    return API_req;
  }
}
