import z from "zod";

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

// CURRENT WEATHER

export const getCurrentWeatherForCitySchema = z.object({
  params: z.object({ city: z.string().min(2) }),
});

export type getCurrentWeatherForCityRequest = z.infer<
  typeof getCurrentWeatherForCitySchema
>;

export const getCurrentWeatherForLocationSchema = z.object({
  params: z.object({
    lat: refinedNumber,
    lon: refinedNumber,
  }),
});

export type getCurrentWeatherForLocationRequest = z.infer<
  typeof getCurrentWeatherForLocationSchema
>;

// // HISTORICAL WEATHER && FUTURE WEATHER

// export const getWeatherForCityOnDateRequestSchema = z.object({
//   params: z.object({ city: z.string().min(2) }),
//   query: z.object({ date: toDate }),
// });

// export type getWeatherForCityOnDateRequest = z.infer<
//   typeof getWeatherForCityOnDateRequestSchema
// >;

// export const getWeatherForLocationOnDateRequestSchema = z.object({
//   params: z.object({
//     lat: toNumber,
//     lon: toNumber,
//   }),
//   query: z.object({ date: toDate }),
// });

// export type getWeatherForLocationOnDateRequest = z.infer<
//   typeof getWeatherForLocationOnDateRequestSchema
// >;

// WEATHER IN DATE RANGE

export const getWeatherForCityInDateRangeSchema = z.object({
  query: z.object({ dateFrom: toDate, dateTo: toDate }),
  params: z.object({ city: z.string().min(2) }),
});

export type getWeatherForCityInDateRangeRequest = z.infer<
  typeof getWeatherForCityInDateRangeSchema
>;

export const getWeatherForLocationInDateRangeSchema = z.object({
  query: z.object({ dateFrom: toDate, dateTo: toDate }),
  params: z.object({ lat: toNumber, lon: toNumber }),
});

export type getWeatherForLocationInDateRangeRequest = z.infer<
  typeof getWeatherForLocationInDateRangeSchema
>;
