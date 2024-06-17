import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
axios.defaults.adapter = "http";
import nock from "nock";
import request from "supertest";
import { app } from "../main";
import { Server } from "http";

describe("WeatherService test suite", () => {
  const key = process.env.API_KEY;

  const queryForCurrentReq = {
    unitGroup: "metric",
    key: key,
    contentType: "json",
    include: "current",
  };

  const queryForPastOrFutureReq = {
    unitGroup: "metric",
    key: key,
    contentType: "json",
  };

  describe("API Integration Tests", () => {
    let server: Server;
    beforeAll(() => {
      server = app.listen(2000);
    });
    beforeEach(() => {
      jest.resetAllMocks();
    });
    afterEach(() => {
      nock.cleanAll();
    });
    afterAll(() => {
      server.close();
    });
    test("testing current weather in given city endpoint", async () => {
      const city = "Lublin";
      const scope = nock(process.env.EXTERNAL_API)
        .get(`/${city}`)
        .query(queryForCurrentReq)
        .reply(200, { currentConditions: { temp: 12 } });

      const response = await request(server).get(`/weather/cities/${city}`);

      expect(scope.isDone()).toBe(true);
      expect(response.body).toBe(12);
      expect(response.statusCode).toBe(200);
    });
    test("testing current weather in given location endpoint", async () => {
      const lat = 51.247;
      const lon = 22.566;
      const space = "%2C%20";
      const scope = nock(process.env.EXTERNAL_API)
        .get(`/${lat + space + lon}`)
        .query(queryForCurrentReq)
        .reply(200, { currentConditions: { temp: 20 } });

      const response = await request(server).get(
        `/weather/locations/${lat}/${lon}`
      );

      expect(scope.isDone()).toBe(true);
      expect(response.body).toBe(20);
      expect(response.statusCode).toBe(200);
    });
    test("testing historical weather in date range in given city endpoint", async () => {
      const city = "Warsaw";
      const dateFrom = "2023-11-10";
      const dateTo = "2023-11-23";
      const scope = nock(process.env.EXTERNAL_API)
        .get(`/${city}/${dateFrom}/${dateTo}`)
        .query(queryForPastOrFutureReq)
        .reply(200, {
          days: [{ datetime: "2023-11-22", temp: 10 }],
        });
      const response = await request(server)
        .get(`/weather/historical/cities/${city}`)
        .query({ dateFrom: dateFrom, dateTo: dateTo });

      console.log(response.body);
      expect(scope.isDone()).toBe(true);
      expect(response.body).toEqual([["2023-11-22", 10]]);
      expect(response.statusCode).toBe(200);
    });
    test("testing historical weather in date range in given location endpoint", async () => {
      const lat = 51.247;
      const lon = 22.566;
      const space = "%2C%20";
      const dateFrom = "2023-11-10";
      const dateTo = "2023-11-23";
      const scope = nock(process.env.EXTERNAL_API)
        .get(`/${lat + space + lon}/${dateFrom}/${dateTo}`)
        .query(queryForPastOrFutureReq)
        .reply(200, {
          days: [{ datetime: "2024-02-20", temp: 100 }],
        });
      const response = await request(server)
        .get(`/weather/historical/locations/${lat}/${lon}`)
        .query({ dateFrom: dateFrom, dateTo: dateTo });

      console.log(response.body);
      expect(scope.isDone()).toBe(true);
      expect(response.body).toEqual([["2024-02-20", 100]]);
      expect(response.statusCode).toBe(200);
    });

    test("testing predicted weather in date range in given city endpoint", async () => {
      const city = "Cracow";
      const dateFrom = "2024-11-10";
      const dateTo = "2024-11-23";
      const scope = nock(process.env.EXTERNAL_API)
        .get(`/${city}/${dateFrom}/${dateTo}`)
        .query(queryForPastOrFutureReq)
        .reply(200, {
          days: [{ datetime: "2024-02-20", temp: 100 }],
        });
      const response = await request(server)
        .get(`/weather/prediction/cities/${city}`)
        .query({ dateFrom: dateFrom, dateTo: dateTo });

      console.log(response.body);
      expect(scope.isDone()).toBe(true);
      expect(response.body).toEqual([["2024-02-20", 100]]);
      expect(response.statusCode).toBe(200);
    });

    test("testing predicted weather in date range in given location endpoint", async () => {
      const lat = 22.247;
      const lon = 31.566;
      const space = "%2C%20";
      const dateFrom = "2024-11-10";
      const dateTo = "2024-11-23";
      const scope = nock(process.env.EXTERNAL_API)
        .get(`/${lat + space + lon}/${dateFrom}/${dateTo}`)
        .query(queryForPastOrFutureReq)
        .reply(200, {
          days: [{ datetime: "2024-02-20", temp: 100 }],
        });
      const response = await request(server)
        .get(`/weather/prediction/locations/${lat}/${lon}`)
        .query({ dateFrom: dateFrom, dateTo: dateTo });

      console.log(response.body);
      expect(scope.isDone()).toBe(true);
      expect(response.body).toEqual([["2024-02-20", 100]]);
      expect(response.statusCode).toBe(200);
    });
  });
});
