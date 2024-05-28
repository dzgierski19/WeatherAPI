import * as dotenv from "dotenv";
dotenv.config();
import nock from "nock";
import request from "supertest";
import { app } from "../main";
import { Server } from "http";
import axios from "axios";
axios.defaults.adapter = "http";

describe("WeatherService test suite", () => {
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
    test("testing city endpoint", async () => {
      const city = "Lublin";
      const key = process.env.API_KEY;
      const date = new Date().toISOString();
      const scope = nock(
        //   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
        // )
        "http://localhost:2000"
      )
        .get(`/weather/cities/${city}`)
        .reply(200, { value: 12 });
      //   // .query({
      //   //   unitGroup: "metric",
      //   //   key: "THMT9Q32G8HSPQZDPZA4QZEJR",
      //   //   contentType: "json",
      //   //   include: "current",
      //   // })
      //   .reply(200, { value: "12" });
      const response = await request(server).get(`/weather/cities/${city}`);
      console.log("Request made to server");
      console.log("Response body:", response.body);

      // Check if the Nock interceptor was used
      console.log("Is Nock interceptor done?", scope.isDone());
      console.log(response.body);
      expect(scope.isDone()).toBe(true);
      expect(response.body).toBe(24.8);
      expect(response.statusCode).toBe(200);
    });
  });
});
// supertest
// polly
// describe("API Integration Tests", () => {
//   let server: Server;
//   beforeEach(() => {
//     server = app.listen(2000);
//   });
//   afterEach(() => {
//     server.close();
//   });
//   it("should return status 200", async () => {
//     const response = await request(server).get("/weather/cities/Lublin");
//     expect(response.status).toBe(200);
//   });
// });

// request => validacje => controlera => serwisu => adaptera => (zamokowane przez ciebie dane) i jest sprawdznie, ze musi byc  => serwisu => controlera => klient
