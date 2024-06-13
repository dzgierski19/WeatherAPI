export const UNITGROUP = {
  METRIC: "metric",
  US: "us",
  UK: "uk",
  BASE: "base",
} as const;

export type unitGroup = (typeof UNITGROUP)[keyof typeof UNITGROUP];

export type APIConfig = {
  API_KEY: string;
  API_URL: string;
};

export const CONTENT_TYPE = {
  JSON: "json",
  CSV: "csv",
} as const;

export type contentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

export type responseDetails = {
  unitGroup?: unitGroup;
  contentType?: contentType;
};

export const standardResponseDetails: responseDetails = {
  unitGroup: UNITGROUP.METRIC,
  contentType: CONTENT_TYPE.JSON,
};
