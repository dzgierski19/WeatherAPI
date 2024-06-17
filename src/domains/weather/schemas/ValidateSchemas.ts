import z from "zod";
import {
  CONTENT_TYPE,
  UNITGROUP,
} from "../adapters/HttpClient/HttpClientTypes";

export const dateCheck = z.string().refine((element) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(element)) return element;
}, "date must be in format YYYY-MM-DD");

export const toNumber = z.coerce.number();
export const toDate = z.coerce.date();

export const refinedNumber = toNumber
  .refine(
    (element) => element >= -180 && element <= 180,
    "Please type number between -180 and 180"
  )
  .refine(
    (element) => String(element).length <= 9,
    "Please type lat/lon with max 9 characters"
  );

export const optionalParameters = z
  .object({
    contentType: z
      .nativeEnum(CONTENT_TYPE)
      .default(CONTENT_TYPE.JSON)
      .optional(),
    unitGroup: z.nativeEnum(UNITGROUP).default(UNITGROUP.METRIC).optional(),
  })
  .optional();

// CURRENT WEATHER

export const getCurrentWeatherForCitySchema = z.object({
  params: z.object({ city: z.string().min(2) }),
  query: optionalParameters,
});

export type getCurrentWeatherForCityRequest = z.infer<
  typeof getCurrentWeatherForCitySchema
>;

export const getCurrentWeatherForLocationSchema = z.object({
  params: z.object({
    lat: refinedNumber,
    lon: refinedNumber,
  }),
  query: optionalParameters,
});

export type getCurrentWeatherForLocationRequest = z.infer<
  typeof getCurrentWeatherForLocationSchema
>;

// WEATHER IN DATE RANGE

export const getWeatherForCityInDateRangeSchema = z.object({
  query: z.object({
    dateFrom: toDate,
    dateTo: toDate,
    contentType: z
      .nativeEnum(CONTENT_TYPE)
      .default(CONTENT_TYPE.JSON)
      .optional(),
    unitGroup: z.nativeEnum(UNITGROUP).default(UNITGROUP.METRIC).optional(),
  }),
  params: z.object({ city: z.string().min(2) }),
});

export type getWeatherForCityInDateRangeRequest = z.infer<
  typeof getWeatherForCityInDateRangeSchema
>;

export const getWeatherForLocationInDateRangeSchema = z.object({
  query: z.object({
    dateFrom: toDate,
    dateTo: toDate,
    contentType: z
      .nativeEnum(CONTENT_TYPE)
      .default(CONTENT_TYPE.JSON)
      .optional(),
    unitGroup: z.nativeEnum(UNITGROUP).default(UNITGROUP.METRIC).optional(),
  }),
  params: z.object({ lat: toNumber, lon: toNumber }),
});

export type getWeatherForLocationInDateRangeRequest = z.infer<
  typeof getWeatherForLocationInDateRangeSchema
>;
