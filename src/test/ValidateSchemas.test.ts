import {
  dateCheck,
  getCurrentWeatherForCitySchema,
  getCurrentWeatherForLocationSchema,
  refinedNumber,
  toDate,
  toNumber,
} from "../schemas/ValidateSchemas";

describe("Schemas testing", () => {
  describe("testing type changing using zod coerce method", () => {
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
  });
  describe("testing lat/lon schema", () => {
    it("should parse correct lat or lon ", () => {
      expect(refinedNumber.safeParse(179.2342).success).toBeTruthy();
      expect(refinedNumber.safeParse("160.8989").success).toBeTruthy();
    });
    describe("it should not parse when: ", () => {
      it("gets number higher than 180 or less than -180", () => {
        expect(refinedNumber.safeParse(181).success).toBeFalsy();
        expect(refinedNumber.safeParse("-190.424").success).toBeFalsy();
      });
      it("gets input inconvertable to number", () => {
        expect(refinedNumber.safeParse("bad_input").success).toBeFalsy();
      });
    });

    describe("testing dateCheck schema", () => {
      it("should parse string in YYYY-MM-DD format", () => {
        expect(dateCheck.safeParse("2024-03-20").success).toBeTruthy();
      });
      it("should not parse string in invalid format ", () => {
        expect(dateCheck.safeParse("2024-3-20").success).toBeFalsy();
      });
    });
    describe("testing getCurrentWeatherForCity schema", () => {
      it("should parse city params with at least 2 characters", () => {
        const checkedParams = { params: { city: "Lublin" } };
        expect(
          getCurrentWeatherForCitySchema.safeParse(checkedParams).success
        ).toBeTruthy();
      });
      describe("it should not parse when: ", () => {
        it("city params has less than 2 characters", () => {
          const checkedParams = { params: { city: "L" } };
          expect(
            getCurrentWeatherForCitySchema.safeParse(checkedParams).success
          ).toBeFalsy();
        });
        it("city params are not string", () => {
          const checkedParams = { params: { city: 123123 } };
          expect(
            getCurrentWeatherForCitySchema.safeParse(checkedParams).success
          ).toBeFalsy();
        });
      });
    });
  });
});
