import {
  getCurrentWeatherForCitySchema,
  getCurrentWeatherForLocationSchema,
  refinedNumber,
  toDate,
  toNumber,
} from "../schemas/ValidateSchemas";

describe("Schemas testing", () => {
  it("should parse lat or lon data ", () => {
    expect(refinedNumber.safeParse(179.2342).success).toBeTruthy();
  });
  it("should change type to number", () => {
    const string = "2";
    expect(typeof string).toBe("string");
    const parsedData = toNumber.safeParse(string).data;
    expect(typeof parsedData).toBe("number");
  });
  it("should change type to date", () => {
    const randomDate = "2024-03-20";
    expect(typeof randomDate).toBe("string");
    const parsedData = toDate.safeParse(randomDate).data;
    expect(parsedData instanceof Date).toBeTruthy();
  });
  it("should parse city name that is at least 2 characters long", () => {
    const checkedParams = { params: { city: "Lublin" } };
    expect(
      getCurrentWeatherForCitySchema.safeParse(checkedParams).success
    ).toBeTruthy();
  });
});
